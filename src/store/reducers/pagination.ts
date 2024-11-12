import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface PaginationState {
  gifts: IPageState;
  transactions: IPageState;
  giftActivity: IPageState;
  userActivity: IPageState;
  userGifts: IPageState;
  leaderboard: IPageState;
}

const initialPageState: IPageState = {
  page: 1,
  timestamp: 0,
};

const initialState: PaginationState = {
  gifts: initialPageState,
  transactions: initialPageState,
  giftActivity: initialPageState,
  userActivity: initialPageState,
  userGifts: initialPageState,
  leaderboard: initialPageState,
} satisfies PaginationState;

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setGiftsPage: (state, action: PayloadAction<Partial<IPageState>>) => {
      state.gifts = { ...state.gifts, ...action.payload };
    },
    setTransactionsPage: (state, action: PayloadAction<Partial<IPageState>>) => {
      state.transactions = { ...state.transactions, ...action.payload };
    },
    setGiftActivityPage: (state, action: PayloadAction<Partial<IPageState>>) => {
      state.giftActivity = { ...state.giftActivity, ...action.payload };
    },
    setUserActivityPage: (state, action: PayloadAction<Partial<IPageState>>) => {
      state.userActivity = { ...state.userActivity, ...action.payload };
    },
    setUserGiftsPage: (state, action: PayloadAction<Partial<IPageState>>) => {
      state.userGifts = { ...state.userGifts, ...action.payload };
    },
    setLeaderboardPage: (state, action: PayloadAction<Partial<IPageState>>) => {
      state.leaderboard = {...state.leaderboard, ...action.payload};
    },
  },
});

export const {
  setGiftsPage,
  setTransactionsPage,
  setGiftActivityPage,
  setUserActivityPage,
  setUserGiftsPage,
  setLeaderboardPage,
} = paginationSlice.actions;

export default paginationSlice.reducer;
