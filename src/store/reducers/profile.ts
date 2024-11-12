import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


type ProfileState = IUser;

const initialState: ProfileState = {
  _id: '',
  telegramId: 0,
  username: '',
  firstName: '',
  lastName: '',
  languageCode: '',
  photoUrl: '',
  giftCount: 0,
  rank: 0,
  isPremium: false,
  isBanned: false,
  createdAt: '',
  updatedAt: '',
} satisfies ProfileState;

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<IUser>) => {
      state._id = action.payload._id;
      state.telegramId = action.payload.telegramId;
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.languageCode = action.payload.languageCode;
      state.photoUrl = action.payload.photoUrl;
      state.giftCount = action.payload.giftCount;
      state.rank = action.payload.rank;
      state.isPremium = action.payload.isPremium;
      state.isBanned = action.payload.isBanned;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    }
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
