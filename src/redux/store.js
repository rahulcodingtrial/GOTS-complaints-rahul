import { configureStore } from '@reduxjs/toolkit';
import complaintReducer from './slices/complaintSlice.js';

export const store = configureStore({
  reducer: {
    complaint: complaintReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['complaint/addFile'],
        ignoredPaths: ['complaint.complaintData.files'],
      },
    }),
});
