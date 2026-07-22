import { configureStore } from '@reduxjs/toolkit';
import { uiReducer } from './uiSlice';
import { apiSlice } from './apiSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      ui: uiReducer,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
