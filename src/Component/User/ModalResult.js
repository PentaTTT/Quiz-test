import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import { toast } from 'react-toastify';

function ModalResult(props) {
    const { show, setShow, dataModal } = props
    const handleClose = () => {
        setShow(false)
    }
    console.log('check dataModal', dataModal)
    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Result</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>Total question you had answer: {dataModal.countTotal}</div>
                <div>Total question correct: {dataModal.countCorrect}</div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Show result</Button>
                <Button variant="primary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>

    );
}

export default ModalResult;