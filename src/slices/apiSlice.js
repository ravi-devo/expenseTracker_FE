import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({ baseUrl: 'https://expensetracker-be-d1t3.onrender.com'});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['Expense', 'User'],
    endpoints: () => ({})
});