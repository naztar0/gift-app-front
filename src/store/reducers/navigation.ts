import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface NavigationState {
  showBackButton: boolean;
  showMenu: boolean;
}

const initialState: NavigationState = {
  showBackButton: false,
  showMenu: true,
} satisfies NavigationState;

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setShowBackButton: (state, action: PayloadAction<boolean>) => {
      state.showBackButton = action.payload;
    },
    setShowMenu: (state, action: PayloadAction<boolean>) => {
      state.showMenu = action.payload;
    },
  },
});

export const { setShowBackButton, setShowMenu } = navigationSlice.actions;

export default navigationSlice.reducer;
