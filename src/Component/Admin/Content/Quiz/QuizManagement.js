import { useState } from "react";
import ModalCreateQuiz from "./ModalCreateQuiz";
import './QuizManagement.scss';
import TableQuiz from "./TableQuiz";
import { useEffect } from "react";
import { getAllQuiz } from '../../../../services/apiService';
import Accordion from 'react-bootstrap/Accordion';
import UpdateQAQuiz from "./UpdateQAQuiz";
import AssignQuiz from "./AssignQuiz";


const QuizManagement = () => {
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [listQuiz, setListQuiz] = useState('')
    // const LIMIT_QUIZ = 6;
    // const [pageCount, setPageCount] = useState(0)
    // const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        fetchListQuiz()
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }
    }

    return (
        <div className="quiz-management-container">
            <div className="title">Quiz Management</div>
            <div className="content">
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Quiz Management</Accordion.Header>
                        <Accordion.Body>
                            <ModalCreateQuiz
                                show={showCreateModal}
                                setShow={setShowCreateModal}
                            // currentPage={currentPage}
                            // setCurrentPage={setCurrentPage}
                            // fetchListUser={fetchListUserWithPaginate}
                            />
                            <div className="user-table">
                                <TableQuiz
                                    listQuiz={listQuiz}
                                />
                            </div>

                            {/* <ModalUpdateUser
                    show={showUpdateModal}
                    setShow={setShowUpdateModal}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListUser={fetchListUserWithPaginate}
                /> */}

                            {/* <ModalShowDetail
                    show={showDetailModal}
                    setShow={setShowDetailModal}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                /> */}

                            {/* <ModalDeleteUser
                    show={showDeleteModal}
                    setShow={setShowDeleteModal}
                    dataDelete={dataUpdate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListUser={fetchListUserWithPaginate}
                /> */}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Update Q/A Quiz</Accordion.Header>
                        <Accordion.Body>
                            <UpdateQAQuiz />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Assign Quiz</Accordion.Header>
                        <Accordion.Body>
                            <AssignQuiz />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

        </div>
    );
}

export default QuizManagement;