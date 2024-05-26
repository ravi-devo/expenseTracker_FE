import { Form, Button } from "react-bootstrap";
import { useAddExpenseMutation } from "../slices/expenseSlice/expenseApi";
import { useState } from "react";
import { addExpense } from "../slices/expenseSlice/expenseReducer";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/navBar";
import Loader from "../components/loader";

const AddExpense = () => {

    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [AddExpenseAPI, {isLoading}] = useAddExpenseMutation();
    const {userInfo} = useSelector((state) => state.auth);
    const token = userInfo.token;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {expenseItems} = useSelector((state) => state.expense);
    console.log("Expense from add", expenseItems);

    const addExpenseHandler = async (e) => {
        e.preventDefault();
        if (description.trim() !== '' && category.trim() !== '' && amount.trim() !== '') {
            try {
                const response = await AddExpenseAPI({ data: { description, amount, category }, token }).unwrap();
                if (response.message === 'Expense added successfully') {
                    dispatch(addExpense(response.data));
                    navigate('/home');
                }
            } catch (error) {
                console.log("error in adding expense", error);
            }
        } else {
            toast.error('All fields are mandatory')
        }
    }

    return (<>
        <div>
            <Header />
            <p className="title-card my-2">Create New Expense</p>
            <Form onSubmit={addExpenseHandler}>
                <Form.Group className="my-2 col-lg-6">
                    <Form.Label>
                        Description
                    </Form.Label>
                    <Form.Control type="text" placeholder="Expense Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="my-2 col-lg-6">
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
                <Form.Group className="my-2 col-lg-6">
                    <Form.Label>
                        Amount
                    </Form.Label>
                    <Form.Control type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </Form.Group>
                <Button style={{backgroundColor: 'lightgreen', border: 'none'}} className="my-2" type="submit">Add Expense</Button>
            </Form>
            {isLoading && <Loader />}
        </div>
    </>)
}

export default AddExpense;