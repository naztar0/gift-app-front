import { RootState } from '@/store';

export const getGiftsPage = (state: RootState) => state.pagination.gifts;
export const getTransactionsPage = (state: RootState) => state.pagination.transactions;
export const getGiftActivityPage = (state: RootState) => state.pagination.giftActivity;
export const getUserActivityPage = (state: RootState) => state.pagination.userActivity;
export const getUserGiftsPage = (state: RootState) => state.pagination.userGifts;
export const getLeaderboardPage = (state: RootState) => state.pagination.leaderboard;
