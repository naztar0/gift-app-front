import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '@/store/reducers/settings';
import navigationReducer from '@/store/reducers/navigation';
import paginationReducer from '@/store/reducers/pagination';
import profileReducer from '@/store/reducers/profile';
import animationReducer from '@/store/reducers/animation';
import { api } from '@/store/api';
import { DEV } from '@/config';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    navigation: navigationReducer,
    pagination: paginationReducer,
    profile: profileReducer,
    animation: animationReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: DEV,
});

// Get the type of the store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']
