import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';


interface AnimationState {
  active: boolean;
  elementId: string;
  props: {
    x: number | 'center';
    y: number | 'center';
    width: number;
    height: number;
  }
}

const initialState: AnimationState = {
  active: false,
  elementId: '',
  props: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
} satisfies AnimationState;

export const animationSlice = createSlice({
  name: 'animation',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<AnimationState['active']>) => {
      state.active = action.payload;
    },
    setElementId: (state, action: PayloadAction<AnimationState['elementId']>) => {
      state.elementId = action.payload;
    },
    setProps: (state, action: PayloadAction<AnimationState['props']>) => {
      state.props = action.payload;
    },
  },
});

export const { setActive, setElementId, setProps } = animationSlice.actions;

export default animationSlice.reducer;
