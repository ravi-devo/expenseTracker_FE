import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Header from "../components/navBar";
import { useUpdateExpenseMutation } from "../slices/expenseSlice/expenseApi";
import { useDispatch, useSelector } from "react-redux";
import { updateExpense } from "../slices/expenseSlice/expenseReducer";
import { toast } from "react-toastify";
import Loader from "../components/loader";

const UpdateExpense = () => {

    const location = useLocation();
    const { expense } = location.state;
    const [description, setDescription] = useState(expense.description);
    const [category, setCategory] = useState(expense.category);
    const [amount, setAmount] = useState(expense.amount);
    const [UpdateExpenseAPI, {isLoading}] = useUpdateExpenseMutation();
    const {userInfo} = useSelector((state) => state.auth);
    const token = userInfo.token;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateExpenseHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await UpdateExpenseAPI({data: {description, category, amount}, token, expenseId: expense._id}).unwrap();
            if(response.message === 'Your expense is updated'){
                dispatch(updateExpense({expenseId: expense._id, response: response.data}));
                navigate('/home');
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    return (<>
        <div>
            <Header />
            <p className="title-card my-2">Update Expense</p>
            <Form onSubmit={updateExpenseHandler}>
                <Form.Group className="my-2">
                    <Form.Label>
                        Description
                    </Form.Label>
                    <Form.Control type="text" placeholder="Expense Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Label>
                        Category
                    </Form.Label>
                    <Form.Select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="" disabled>Choose an option</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Grocery">Grocery</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Food & Beverages">Food & Beverages</option>
                        <option value="Others">Others</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="my-2">
                    <Form.Label>
                        Amount
                    </Form.Label>
                    <Form.Control type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </Form.Group>
                <Button className="my-2" style={{backgroundColor: 'lightgreen', border: 'none'}} type="submit">Update Expense</Button>
            </Form>
            {isLoading && <Loader />}
        </div>
    </>)
}

export default UpdateExpense;