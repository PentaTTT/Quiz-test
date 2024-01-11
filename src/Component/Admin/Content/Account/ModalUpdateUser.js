import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
// import previewImage from '../../../assets/preview-img.jpg';
import { FcPlus } from 'react-icons/fc';
import { toast } from "react-toastify";
import { putUpdateUser } from '../../../../services/apiService'
import { useEffect } from 'react';
import _ from 'lodash';
import Select from 'react-select'

const ModalUpdateUser = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState('');
    const [previewImg, setPreviewImg] = useState('');
    const options = [
        { value: 'USER', label: 'USER' },
        { value: 'ADMIN', label: 'ADMIN' }
    ]

    const { show, setShow, fetchListUser, dataUpdate, setDataUpdate, currentPage } = props;
    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setPassword('******');
            setUsername(dataUpdate.username);
            if (dataUpdate.role) {
                let temp = { value: dataUpdate.role, label: dataUpdate.role };
                setRole(temp)
            };
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
        setRole('');
        setImage('');
        setPreviewImg('');
        setDataUpdate({});
    }
    const handleUploadFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImg(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }
    }

    const handleSubmitUpdateUser = async () => {
        //validate
        let data = await putUpdateUser(dataUpdate.id, username, role.value, image)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListUser(currentPage);
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (

        <>
            <Modal show={show} onHide={handleClose} size='xl' className='modal-create-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Update user</Modal.Title>
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
                        <div className="form-group col-md-4 my-2">
                            <label htmlFor="inputState">Role</label>
                            <Select
                                id="inputState"
                                onChange={setRole}
                                value={role}
                                options={options}
                                placeholder={'set role...'}
                            >

                            </Select>
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
                    <Button variant="primary" onClick={() => { handleSubmitUpdateUser() }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;