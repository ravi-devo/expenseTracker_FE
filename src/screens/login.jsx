import { useEffect, useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../slices/userSlice/userApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCredential } from '../slices/userSlice/authReducer';
import { useNavigate, Link } from 'react-router-dom';
import Loader from '../components/loader';
import '../styles/login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [LoginAPI, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            if (email.trim() !== '' && password.trim() !== '') {
                const res = await LoginAPI({ email, password }).unwrap();
                if (res.message === 'User authenticated successfully') {
                    dispatch(setCredential({ ...res }));
                    navigate('/home');
                }
            } else {
                toast.error('Email or Password cannot be empty.');
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

    useEffect(() => {
        if (userInfo) {
            navigate('/home');
        }
    }, [userInfo, navigate])

    return (<>
        <div className='page-container'>
            <div className='login-container'>
                <h2>Welcome Back!</h2>
                <p>Login to gain access to your expense</p>
                <div className='form-container'>
                    <Form onSubmit={handleSubmitForm}>
                        <Form.Group className='my-2' id='emailGroup'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='my-2' id='passwordGroup'>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <InputGroup>
                                <Form.Control type={showPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <InputGroup.Text onClick={handleTogglePasswordVisibility}>
                                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <p>Have not registered yet? <Link to='/register'>Register</Link></p>
                        <Button type='submit'>
                            Login
                        </Button>
                    </Form>
                </div>
                {isLoading && <Loader />}
            </div>
        </div>
    </>)
}

export default Login;