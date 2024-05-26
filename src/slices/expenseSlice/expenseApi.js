import { apiSlice } from "../apiSlice";
const EXPENSE_URL = '/api/expense'

export const expenseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllExpenses: builder.mutation({
            query: (token) => ({
                url: `${EXPENSE_URL}/userExpense`,
                method: 'GET',
                headers: {'Authorization': `Bearer ${token}`}
            })
        }),
        addExpense: builder.mutation({
            query: (args) => {
                const {data, token} = args;
                return {
                    url: `${EXPENSE_URL}/addExpense`,
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${token}`},
                    body: data
                }
            }
        }),
        updateExpense: builder.mutation({
            query: (args) => {
                const {token, expenseId, data} = args
                return {
                    url: `${EXPENSE_URL}/${expenseId}`,
                    method: 'PUT',
                    headers: {'Authorization': `Bearer ${token}`},
                    body: data
            }}
        }),
        deleteExpense: builder.mutation({
            query: (args) => {
                const {token, expenseId} = args
                return {
                    url: `${EXPENSE_URL}/${expenseId}`,
                    method: 'DELETE',
                    headers: {'Authorization': `Bearer ${token}`}
            }}
        }),
    })
});

export const { 
    useGetAllExpensesMutation, 
    useAddExpenseMutation, 
    useUpdateExpenseMutation, 
    useDeleteExpenseMutation 
} = expenseApiSlice;