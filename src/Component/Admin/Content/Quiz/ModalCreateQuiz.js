import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import { toast } from "react-toastify";
import { postCreateNewQuiz } from '../../../../services/apiService';
// import { Select } from 'react-select';

const ModalCreateQuiz = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('EASY');
    const [image, setImage] = useState('');
    const [previewImg, setPreviewImg] = useState('');

    // const options = [
    //     { value: 'EASY', label: 'EASY' },
    //     { value: 'MEDIUM', label: 'MEDIUM' },
    //     { value: 'HARD', label: 'HARD' }
    // ]

    const { show, setShow, } = props;

    const handleClose = () => {
        setShow(false);
        setName('');
        setDescription('');
        setDifficulty('EASY');
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

    const handleSubmitCreateQuiz = async () => {
        //validate
        if (!name) {
            toast.error('Invalid name');
            return;
        }
        if (!description) {
            toast.error('Invalid description');
            return;
        }
        //call api
        let data = await postCreateNewQuiz(name, description, difficulty, image)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            // await fetchListUser(1)
            // setCurrentPage(1)
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Button className='my-2' variant="primary" onClick={handleShow}>
                <FcPlus className='mx-1' />
                Add new quiz
            </Button>

            <Modal show={show} onHide={handleClose} size='lg' className='modal-create-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='row'>
                        <div className="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingName"
                                onChange={(event) => setName(event.target.value)}
                            />
                            <label className='mx-2' htmlFor="floatingName">Quiz name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingDescription"
                                onChange={(event) => setDescription(event.target.value)}
                            />
                            <label className='mx-2' htmlFor="floatingDescription">Description</label>
                        </div>

                        <div className='col-md-6 my-2'>
                            <label className='form-label label-upload py-2' htmlFor='uploadFile'>
                                <FcPlus /> Upload File Image</label>
                            <input id='uploadFile'
                                type='file' hidden
                                onChange={(event) => handleUploadFile(event)}
                            />
                        </div>

                        <div className="col-6 form-floating">
                            <select className="form-select" id="floatingSelect"
                                onChange={(event) => setDifficulty(event.target.value)}
                            >

                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                            <label className='mx-2' htmlFor="floatingSelect">Set difficulty</label>
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
                    <Button variant="primary" onClick={() => { handleSubmitCreateQuiz() }}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateQuiz;