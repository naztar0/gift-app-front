import { api } from '.';


export const transactionsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query<ITransaction[], IPaginationParams>({
      query: ({ page, pageSize }) => `transactions?page=${page}&pageSize=${pageSize}`,
      providesTags: (result = []) => result
        ? [...result.map(({ _id }) => ({ type: 'Transaction' as const, id: _id })), 'Transaction']
        : ['Transaction'],
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    getTransaction: build.query<ITransaction, string>({
      query: (id) => `transactions/${id}`,
      providesTags: (_post, _err, id) =>
        [{ type: 'Transaction', id }],
    }),
    transferTransaction: build.query<ITransfer, string>({
      query: (id) => ({
        url: `transactions/${id}/transfer`,
        method: 'POST',
      }),
      providesTags: (result) =>
        [{ type: 'Transfer', id: result?._id }],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useGetTransactionQuery,
  useTransferTransactionQuery,
} = transactionsApi;

export const {
  endpoints: {
    getTransactions,
    getTransaction,
    transferTransaction,
  }
} = transactionsApi;
