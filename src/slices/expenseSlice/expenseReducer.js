import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expenseItems: []
}

const expenseReducer = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        getAllExpense: (state, action) => {
            state.expenseItems = action.payload;
        },
        addExpense: (state, action) => {
            state.expenseItems.unshift(action.payload);
        },
        updateExpense: (state, action) => {
            const {expenseId, response} = action.payload;
            state.expenseItems = state.expenseItems.filter((item) => item._id != expenseId);
            state.expenseItems.push(response);
        },
        deleteExpense: (state, action) => {
            const expenseId = action.payload;
            state.expenseItems = state.expenseItems.filter((expense) => expenseId !== expense._id);
        }
    }
});

export const { getAllExpense, addExpense, updateExpense, deleteExpense } = expenseReducer.actions;
export default expenseReducer.reducer;