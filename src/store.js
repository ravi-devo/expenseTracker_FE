import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/userSlice/authReducer';
import { apiSlice } from './slices/apiSlice';
import expenseReducer from './slices/expenseSlice/expenseReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        expense: expenseReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;