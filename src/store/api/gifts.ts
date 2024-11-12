import { api } from '.';


export const giftsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getGifts: build.query<IGift[], IPaginationParams>({
      query: ({ page, pageSize }) => `gifts?page=${page}&pageSize=${pageSize}`,
      providesTags: () => ['Gift'],
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    getGift: build.query<IGift, string>({
      query: (id) => `gifts/${id}`,
      providesTags: (_post, _err, id) => [{ type: 'Gift', id }],
    }),
    getGiftActivity: build.query<IGiftActivity[], { id: string } & IPaginationParams>({
      query: ({ id, page, pageSize }) => `gifts/${id}/activity?page=${page}&pageSize=${pageSize}`,
      providesTags: () => ['GiftActivity'],
      serializeQueryArgs: ({ endpointName, queryArgs }) => endpointName + queryArgs.id,
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    buyGift: build.query<IGiftBuy, string>({
      query: (id) => ({
        url: `gifts/${id}/buy`,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useGetGiftsQuery,
  useGetGiftQuery,
  useGetGiftActivityQuery,
  useBuyGiftQuery,
} = giftsApi;

export const {
  endpoints: {
    getGifts,
    getGift,
    getGiftActivity,
    buyGift,
  }
} = giftsApi;
