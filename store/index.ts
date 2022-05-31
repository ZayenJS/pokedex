import { configureStore } from '@reduxjs/toolkit';

import { reducer } from './reducers';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
