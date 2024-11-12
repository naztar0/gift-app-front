import { api } from '.';


export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<IUser, void | null>({
      query: () => 'me',
      providesTags: [{ type: 'User', id: 'me' }],
    }),
    getActivity: build.query<IUserActivity[], IPaginationParams>({
      query: ({ page, pageSize }) => `me/activity?page=${page}&pageSize=${pageSize}`,
      providesTags: () => ['UserActivity'],
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    getUser: build.query<IUser, string>({
      query: (id) => `users/${id}`,
      providesTags: (_post, _err, id) =>
        [{ type: 'User', id }],
    }),
    getUserGifts: build.query<ITransfer[], { id: string } & IPaginationParams>({
      query: ({ id, page, pageSize }) => `users/${id}/gifts?page=${page}&pageSize=${pageSize}`,
      providesTags: (_post, _err, { id }) =>
        [{ type: 'Transfer', id }],
      serializeQueryArgs: ({ endpointName, queryArgs }) => endpointName + queryArgs.id,
      merge: (currentCache, newItems) => {
        if (!currentCache.some((item) => newItems[0]?._id === item._id)) {
          currentCache.push(...newItems);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetMeQuery,
  useGetActivityQuery,
  useGetUserGiftsQuery,
} = usersApi;

export const {
  endpoints: {
    getUser,
    getMe,
    getActivity,
    getUserGifts,
  }
} = usersApi;
