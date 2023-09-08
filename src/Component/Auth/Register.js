import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiService'
import './Register.scss'
import { useState } from 'react';
import { toast } from 'react-toastify';

const Register = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleRegister = async () => {
        let res = await postRegister(userName, email, password)

        if (res && res.EC === 0) {
            toast.success(res.EM)
            navigate('/login')
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }
    }
    return (
        <>
            <section className="vh-100 bg-image"
                style={{ backgroundImage: `url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')` }}>
                <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div className="container h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div className="card" style={{ borderRadius: '15px', height: '700px' }}>
                                    <div className="card-body pt-5 px-5">
                                        <h4 className="text-uppercase text-center mb-5">Create an account</h4>

                                        <form>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                                                <input type="text" id="form3Example1cg" className="form-control form-control-lg"
                                                    onChange={(event) => setUserName(event.target.value)}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                                                <input type="email" id="form3Example3cg" className="form-control form-control-lg"
                                                    onChange={(event) => setEmail(event.target.value)}
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example4cg">Password</label>
                                                <input type="password" id="form3Example4cg" className="form-control form-control-lg"
                                                    onChange={(event) => setPassword(event.target.value)}
                                                />
                                            </div>

                                            {/* <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                                                <input type="password" id="form3Example4cdg" className="form-control form-control-lg" />
                                            </div> */}

                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                                                <label className="form-check-label" htmlFor="form2Example3g">
                                                    I agree all statements in <a href="#!" className="text-body" onClick={() => navigate('/')}><u>Terms of service</u></a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center">
                                                <button type="button"
                                                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                                                    onClick={() => handleRegister()}
                                                >Register</button>
                                            </div>

                                            <p className="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                                                className="fw-bold text-body" onClick={() => navigate('/login')}><u>Login here</u></a></p>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Register;
