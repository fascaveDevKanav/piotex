import { configureStore } from '@reduxjs/toolkit';
import reduxData from '../features/reduxData';

// Configure store without redux-persist
export const store = configureStore({
  reducer: {
    reduxData, // you can add more slices here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
