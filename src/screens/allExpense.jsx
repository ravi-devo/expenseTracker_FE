import { Table } from "react-bootstrap";
import Header from "../components/navBar";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useDeleteExpenseMutation, useGetAllExpensesMutation } from "../slices/expenseSlice/expenseApi";
import { deleteExpense, getAllExpense } from "../slices/expenseSlice/expenseReducer";
import { toast } from "react-toastify";
import '../styles/allExpense.css';
import Loader from "../components/loader";

const AllExpense = () => {

    let { expenseItems } = useSelector((state) => state.expense);
    const totalAmount = expenseItems.reduce((sum, expense) => sum + expense.amount, 0);
    const navigate = useNavigate();
    const {userInfo} = useSelector((state) => state.auth);
    const token = userInfo.token;
    const dispatch = useDispatch();
    const [GetAllExpenses, {isLoading}] = useGetAllExpensesMutation();
    const [DeleteExpense] = useDeleteExpenseMutation();

    const handleEdit = (expense) => {
        navigate('/updateExpense', {state: {expense}})
    }

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    expenseItems = [...expenseItems].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    const handleDelete = async (expense) => {
        try {
            const response = await DeleteExpense({token, expenseId: expense._id}).unwrap();
            if(response.message === 'Expense deleted successfully'){
                dispatch(deleteExpense(response.data._id));
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    useEffect(() => {
        const getAllExpenses = async () => {
            try {
                const response = await GetAllExpenses(token).unwrap();
                if (response.message === 'Expense fetched successfully') {
                    dispatch(getAllExpense(response.data));
                    console.log("Expenses fetched successfully")
                }
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }

        getAllExpenses();
    },[dispatch, token, GetAllExpenses])

    return (<>
        <div>
            <Header />
            <p className="my-2 title-card">All Expense</p>
            <Table responsive bordered className="my-2">
                <thead>
                    <tr>
                        <th>Expense Description</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {expenseItems.map((expense) => <tr key={expense._id}>
                        <td>{expense.description}</td>
                        <td>{formatDate(expense.date)}</td>
                        <td>{expense.category}</td>
                        <td>{expense.amount}</td>
                        <td>
                            <div className="d-flex">
                                <CiEdit className="mx-1" style={{ cursor: 'pointer' }}
                                    onClick={() => handleEdit(expense)} />
                                <MdDeleteOutline className="mx-1" style={{ cursor: 'pointer' }}
                                    onClick={() => handleDelete(expense)} />
                            </div>
                        </td>
                    </tr>)}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" className="text-right"><strong>Total:</strong></td>
                        <td colSpan="2"><strong>Rs. {totalAmount}</strong></td>
                    </tr>
                </tfoot>
            </Table>
            {isLoading && <Loader />}
        </div>
    </>)
}

export default AllExpense;