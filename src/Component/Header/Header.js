import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
//import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { postLogout } from '../../services/apiService';
import { toast } from 'react-toastify';
import { logoutAction } from '../../redux/action/userAction';


const Header = () => {

    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const dispatch = useDispatch()
    console.log(account)
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate('/login')
    }
    const handleRegister = () => {
        navigate('/register')
    }
    const handleLogout = async () => {
        let res = await postLogout(account.email, account.refresh_token)
        if (res && res.EC === 0) {
            //clear data
            dispatch(logoutAction())
            navigate('/login')
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <Navbar expand="lg" className="bg-gradient">
            <Container>
                <NavLink to="/" className='navbar-brand'>Quiz Test</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/user" className='nav-link'>Users</NavLink>
                        <NavLink to="/admin" className='nav-link'>Admin</NavLink>
                    </Nav>

                    <Nav className="">
                        {
                            isAuthenticated === false ?
                                <>
                                    <button className='btn btn-outline-dark mx-2'
                                        onClick={() => handleLogin()}
                                    >Log in</button>
                                    <button className='btn btn-dark'
                                        onClick={() => handleRegister()}
                                    >Sign up</button>
                                </>
                                :
                                <>
                                    <NavDropdown title={account.username} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/login">Profile</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={() => handleLogout()}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;