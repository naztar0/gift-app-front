import { api } from '.';


export const leaderboardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getLeaderboard: build.query<IUserShort[], { search: string } & IPaginationParams>({
      query: ({ page, pageSize, search }) => `leaderboard?page=${page}&pageSize=${pageSize}&search=${search}`,
      providesTags: () => ['Leaderboard'],
      serializeQueryArgs: ({ endpointName, queryArgs }) => endpointName + (queryArgs?.search || ''),
      merge: (currentCache, newItems) => {
        if (!currentCache.some((item) => newItems.some((newItem) => newItem._id === item._id))) {
          currentCache.push(...newItems);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page || currentArg?.search !== previousArg?.search;
      },
      keepUnusedDataFor: 0,
    }),
  }),
});

export const {
  useGetLeaderboardQuery,
} = leaderboardApi;

export const {
  endpoints: {
    getLeaderboard,
  }
} = leaderboardApi;
