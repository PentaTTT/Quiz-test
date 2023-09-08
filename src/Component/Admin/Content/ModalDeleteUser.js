import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService';
import { toast } from 'react-toastify';

function ModalDeleteUser(props) {
    const { show, setShow, dataDelete, fetchListUser, setCurrentPage } = props
    const handleClose = () => {
        setShow(false)
    }
    const handleSubmitDelete = async () => {
        let res = await deleteUser(dataDelete.id)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            handleClose()
            await fetchListUser(1)
            setCurrentPage(1)
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }
    }

    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm delete user?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>Are you sure to delete this user? email :
                    <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b>
                </p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={() => handleSubmitDelete()}>Confirm delete</Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalDeleteUser;