import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { useEffect } from 'react';
import _ from 'lodash';

const ModalShowDetail = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user');
    const [, setImage] = useState('');
    const [previewImg, setPreviewImg] = useState('');

    const { show, setShow, dataUpdate, setDataUpdate } = props;
    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setPassword('******');
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            if (dataUpdate.image) {
                setPreviewImg(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate]);

    const handleClose = () => {
        setShow(false);
        setEmail('');
        setPassword('');
        setUsername('');
        setRole('user');
        setImage('');
        setPreviewImg('');
        setDataUpdate({});
    }
    // const handleUploadFile = (event) => {
    //     if (event.target && event.target.files && event.target.files[0]) {
    //         setPreviewImg(URL.createObjectURL(event.target.files[0]))
    //         setImage(event.target.files[0])
    //     }
    // }

    return (

        <>
            <Modal show={show} onHide={handleClose} size='xl' className='modal-create-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Detail user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='row'>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email"
                                className="form-control"
                                id="inputEmail4"
                                disabled
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
                        <div className="form-group col-md-6 my-2">
                            <label htmlFor="inputState">Role</label>
                            <select id="inputState"
                                className="form-control"
                                value={role}
                                onChange={event => setRole(event.target.value)}
                            >
                                <option defaultValue='user'>user</option>
                                <option value='admin'>admin</option>
                            </select>
                        </div>

                        <div className='col-md-6 my-2 mx-2 img-preview'>
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
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalShowDetail;