import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import CategoriesReducer, { categoriesApiSlice } from '../features/categories/categorySlice';
import CastMemberReducer, { castMemberApiSlice } from '../features/cast/castMemberSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    categories: CategoriesReducer,
    castMembers: CastMemberReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
