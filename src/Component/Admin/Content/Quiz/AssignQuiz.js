import { useState, useEffect } from "react";
import Select from "react-select";
import { getAllQuiz, getAllUser, postAssignQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify'

const AssignQuiz = () => {
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })//build data select input
            setListQuiz(newQuiz)
        }
    }
    const fetchUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            let newUser = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })//build data select input
            setListUser(newUser)
        }
    }

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="assign-quiz-container row justify-content-center">
            <div className='col-4 form-group mx-3 mb-3'>
                <label>Select Quiz: </label>
                <Select
                    className='my-2'
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>

            <div className='col-4 form-group mx-3 mb-3'>
                <label>Select User: </label>
                <Select
                    className='my-2'
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>

            <div>
                <button
                    className="btn btn-warning mx-5"
                    onClick={handleAssign}
                >Save</button>
            </div>
        </div>
    );
}

export default AssignQuiz;