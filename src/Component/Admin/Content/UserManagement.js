import { useState, useEffect } from "react";
import ModalCreateUser from "./ModalCreateUser";
import './UserManagement.scss';
import { getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalShowDetail from "./ModalShowDetail";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";


const UserManagement = () => {
    const LIMIT_USER = 6
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [listUser, setListUser] = useState([])
    const [dataUpdate, setDataUpdate] = useState({})

    useEffect(() => {
        fetchListUserWithPaginate(1);
    }, [])

    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages)
        }
    }

    const clickBtnUpdate = (user) => {
        setShowUpdateModal(true)
        setDataUpdate(user)
    }
    const clickBtnView = (user) => {
        setShowDetailModal(true)
        setDataUpdate(user)
    }
    const clickBtnDelete = (user) => {
        setShowDeleteModal(true)
        setDataUpdate(user)
    }

    return (
        <div className="user-management-container">
            <div className="title">User Management</div>
            <div className="content">
                <ModalCreateUser
                    show={showCreateModal}
                    setShow={setShowCreateModal}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListUser={fetchListUserWithPaginate}
                />
                <div className="user-table">
                    <TableUserPaginate
                        listUser={listUser}
                        listUserWithPaginate={fetchListUserWithPaginate}
                        clickBtnUpdate={clickBtnUpdate}
                        clickBtnView={clickBtnView}
                        clickBtnDelete={clickBtnDelete}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>

                <ModalUpdateUser
                    show={showUpdateModal}
                    setShow={setShowUpdateModal}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListUser={fetchListUserWithPaginate}
                />

                <ModalShowDetail
                    show={showDetailModal}
                    setShow={setShowDetailModal}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                />

                <ModalDeleteUser
                    show={showDeleteModal}
                    setShow={setShowDeleteModal}
                    dataDelete={dataUpdate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    fetchListUser={fetchListUserWithPaginate}
                />
            </div>

        </div>
    );
}

export default UserManagement;