import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../styles/navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../slices/userSlice/authReducer';


const Header = () => {

  const dispatch = useDispatch();
  const {expenseItems} = useSelector((state) => state.expense);

  const logOutHandler = () => {
    dispatch(logOut());
  }

  return (
    <Navbar expand="lg" className="custom-navbar" variant='dark'>
      <Container>
        <Navbar.Brand>
            Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='nav-hamburger' />
        <Navbar.Collapse id='nav-hamburger'>
            <Nav>
                <LinkContainer to='/home'>
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
            </Nav>
            {expenseItems.length > 0 && <Nav>
                <LinkContainer to='/allExpense'>
                    <Nav.Link>All Expense</Nav.Link>
                </LinkContainer>
            </Nav>}
            <Nav className='ms-auto'>
                <LinkContainer to='/'>
                    <Nav.Link onClick={logOutHandler}>Log Out</Nav.Link>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;