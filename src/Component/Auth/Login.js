import { useState } from 'react';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { loginAction } from '../../redux/action/userAction';
import { ImSpinner9 } from 'react-icons/im'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async () => {
        //validate
        const isValid = validateEmail(email)
        if (!isValid) {
            toast.error('Invalid email');
            return;
        }
        if (!password) {
            toast.error('Invalid password');
            return;
        }
        setIsLoading(true)
        //submit
        let res = await postLogin(email, password)
        if (res && res.EC === 0) {
            dispatch(loginAction(res))
            toast.success(res.EM)
            setIsLoading(false)
            navigate('/')
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
            setIsLoading(false)
        }
    }

    const handleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">

                                        <div className="text-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                style={{ width: "185px" }} alt="logo" />
                                            <h4 className="mt-1 mb-5 pb-1 text-uppercase">Log in your account</h4>
                                        </div>

                                        <form>

                                            <div className="form-outline mb-3">
                                                <label className="form-label" htmlFor="form2Example11">Username</label>
                                                <input type="email" id="form2Example11" className="form-control"
                                                    placeholder="Phone number or email address"
                                                    onChange={(event) => { setEmail(event.target.value) }}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form2Example22">Password</label>
                                                <input type="password" id="form2Example22" className="form-control"
                                                    onChange={(event) => { setPassword(event.target.value) }}
                                                    onKeyDown={(event) => handleKeyDown(event)}
                                                />
                                            </div>

                                            <div className="text-center pt-1 pb-1">
                                                <button className="col-12 btn btn-primary gradient-custom-2 mb-2" type="button"
                                                    onClick={() => { handleLogin() }}
                                                    disabled={isLoading}
                                                >
                                                    {isLoading === true && <ImSpinner9 className='icon-loading' />}
                                                    Log in</button>

                                            </div>
                                            <div className="text-center pt-1 mb-5 pb-1"
                                                onClick={() => navigate('/')}
                                            >
                                                <a className="text-muted text-decoration-none" href="#!">Forgot password?</a>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">Don't have an account?</p>
                                                <button type="button" className="btn btn-outline-danger"
                                                    onClick={() => navigate('/register')}
                                                >Create new</button>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">We are more than just a company</h4>
                                        <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;