import { useDispatch, useSelector } from "react-redux";
import { useGetAllExpensesMutation } from "../slices/expenseSlice/expenseApi";
import { useEffect } from "react";
import { getAllExpense } from "../slices/expenseSlice/expenseReducer";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import ExpenseChart from "../components/expenseChart";
import Header from "../components/navBar";
import '../styles/home.css';
import { toast } from "react-toastify";

const Home = () => {

    const [GetAllExpenses] = useGetAllExpensesMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const token = userInfo.token;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { expenseItems } = useSelector((state) => state.expense);
    const totalAmount = expenseItems.reduce((sum, expense) => sum + expense.amount, 0);
    const recentExpenses = [...expenseItems].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
    const goToAddExpense = () => {
        navigate('/addExpense');
    }

    useEffect(() => {
        const getAllExpenses = async () => {
            try {
                const response = await GetAllExpenses(token).unwrap();
                if (response.message === 'Expense fetched successfully') {
                    dispatch(getAllExpense(response.data));
                }
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }

        getAllExpenses();
    }, [dispatch, GetAllExpenses, token])
    return (<>
        <div className="container-height">
            <Header />
            {expenseItems.length ?
                <div>
                    <div className="d-flex justify-content-between my-2">
                        <p className="title-card">Dashboard</p>
                        <Button style={{ backgroundColor: 'lightgreen', border: 'none' }} onClick={goToAddExpense}>Add Expense</Button>
                    </div>
                    <Row className="row-height">
                        <Col className="left-container" lg={5} xs={12}>
                            <p className="title-card">Hello {userInfo.data.name}!</p>
                            <div className="amount-container">
                                Total Expense: Rs. {totalAmount}
                            </div>
                            <div className="recent-spent">
                                <p className="title-card">Your recent spends are follows:</p>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Description</th>
                                            <th>Category</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentExpenses.map((expense) => <tr key={expense._id}>
                                            <td>{expense.description}</td>
                                            <td>{expense.category}</td>
                                            <td>{expense.amount}</td>
                                        </tr>)}
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                        <Col lg={7} xs={12}>
                            <ExpenseChart />
                        </Col>
                    </Row>
                </div> :
                <div className="page-container">
                    <div className="empty-container">
                        <h2>Hello {userInfo.data.name}!</h2>
                        <p>You have not added any expenses, please add expense by clicking the below button</p>
                        <Button style={{backgroundColor: 'lightgreen', border: 'none'}} onClick={goToAddExpense}>Add Expense</Button>
                    </div>
                </div>
            }
        </div>
    </>)
}

export default Home;