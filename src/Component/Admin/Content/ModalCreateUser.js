import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
// import previewImage from '../../../assets/preview-img.jpg';
import { FcPlus } from 'react-icons/fc';
import { toast } from "react-toastify";
import { postCreateNewUser } from '../../../services/apiService'

const ModalCreateUser = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('USER');
    const [image, setImage] = useState('');
    const [previewImg, setPreviewImg] = useState('');

    const { show, setShow, fetchListUser, setCurrentPage } = props;

    const handleClose = () => {
        setShow(false);
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('USER');
        setImage('');
        setPreviewImg('')
    }
    const handleShow = () => setShow(true);
    const handleUploadFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmitCreateUser = async () => {
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

        let data = await postCreateNewUser(email, password, username, role, image)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListUser(1)
            setCurrentPage(1)
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Button className='my-2' variant="primary" onClick={handleShow}>
                <FcPlus className='mx-1' />
                Add new user
            </Button>

            <Modal show={show} onHide={handleClose} size='xl' className='modal-create-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='row'>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email"
                                className="form-control"
                                id="inputEmail4"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Password</label>
                            <input type="password"
                                className="form-control"
                                id="inputPassword4"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                        </div>

                        <div className="form-group col-md-6 my-2">
                            <label htmlFor="inputAddress">Username</label>
                            <input type="text"
                                className="form-control"
                                id="inputAddress"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="form-group col-md-4 my-2">
                            <label htmlFor="inputState">Role</label>
                            <select id="inputState"
                                className="form-control"
                                value={role}
                                onChange={event => setRole(event.target.value)}
                            >
                                <option defaultValue='USER'>user</option>
                                <option value='ADMIN'>admin</option>
                            </select>
                        </div>

                        <div className='col-md-12 my-2'>
                            <label className='form-label label-upload' htmlFor='uploadFile'>
                                <FcPlus /> Upload File Image</label>
                            <input id='uploadFile'
                                type='file' hidden
                                onChange={(event) => handleUploadFile(event)}
                            />
                        </div>

                        <div className='col-md-12 mx-2 img-preview'>
                            {
                                previewImg ?
                                    <img src={previewImg} alt='preview img' />
                                    :
                                    <label className='px-3'>Image Preview</label>
                            }


                        </div>

                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => { handleSubmitCreateUser() }}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;