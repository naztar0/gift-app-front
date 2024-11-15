import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';
import { BASE_API_URL } from '@/config';


const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers) => {
    const token = retrieveLaunchParams().initDataRaw;
    if (token) {
      headers.set('authorization', `Telegram ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

export type TagType =
  | 'Gift'
  | 'GiftActivity'
  | 'Transaction'
  | 'Transfer'
  | 'User'
  | 'UserActivity'
  | 'Leaderboard';

export const tagTypes: TagType[] = [
  'Gift',
  'GiftActivity',
  'Transaction',
  'Transfer',
  'User',
  'UserActivity',
  'Leaderboard',
];

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
  /**
   * `reducerPath` is optional and will not be required by most users.
   * This is useful if you have multiple API definitions,
   * e.g., where each has a different domain, with no interaction between endpoints.
   * Otherwise, a single API definition should be used to support tag invalidation,
   * among other features
   */
  reducerPath: 'splitApi',
  /**
   * A bare-bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
   */
  baseQuery: baseQueryWithRetry,
  /**
   * Tag types must be defined in the original API definition
   * for any tags that would be provided by injected endpoints
   */
  tagTypes,
  /**
   * This api has endpoints injected in adjacent files,
   * which is why no endpoints are shown below.
   * If you want all endpoints defined in the same file, they could be included here instead
   */
  endpoints: () => ({}),
});
