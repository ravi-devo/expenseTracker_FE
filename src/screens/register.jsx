import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/userSlice/userApi";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCredential } from "../slices/userSlice/authReducer";
import Loader from "../components/loader";
import '../styles/register.css'

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState('');
    const [RegisterAPI, { isLoading }] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            if (email.trim() !== '' && password.trim() !== '' && name.trim() !== '') {
                const res = await RegisterAPI({ name, email, password }).unwrap();
                if (res.message === 'User account created successfully') {
                    dispatch(setCredential({ ...res }));
                    navigate('/home');
                }
            } else {
                toast.error('All fields are mandatory');
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    return (<>
        <div className="page-container">
            <div className="register-container">
                <h2>Register your account</h2>
                <p>Manage all your expense at one place</p>
                <div className="registerForm-container">
                    <Form onSubmit={handleSubmitForm}>
                        <Form.Group className="my-2">
                            <Form.Label>
                                Name
                            </Form.Label>
                            <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="my-2">
                            <Form.Label>
                                Password
                            </Form.Label>
                            <InputGroup>
                                <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <InputGroup.Text onClick={handleTogglePasswordVisibility}>
                                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <p>Already registered? <Link to='/'>Login</Link></p>
                        <Button type="submit">Register</Button>
                    </Form>
                </div>
                {isLoading && <Loader />}
            </div>
        </div>
    </>)
}

export default Register;