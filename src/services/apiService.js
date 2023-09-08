import axios from '../utils/axiosCustomize';

const postCreateNewUser = async (email, password, username, role, image) => {
    const form = new FormData(); //upload file with form-data
    form.append('email', email);
    form.append('password', password);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return await axios.post('api/v1/participant', form) //api call
}

const getAllUser = async () => {
    return await axios.get('api/v1/participant/all')
}

const putUpdateUser = async (id, username, role, image) => {
    const form = new FormData(); //upload file with form-data
    form.append('id', id);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return await axios.put('api/v1/participant', form) //api call
}

const deleteUser = async (id) => {
    return await axios.delete('api/v1/participant', { data: { id: id } })
}

const getUserWithPaginate = async (page, limit) => {
    return await axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = async (email, password) => {
    return await axios.post(`api/v1/login`, { email, password }) //upload data urlencoded
}

const postRegister = async (username, email, password) => {
    return await axios.post(`api/v1/register`, { username, email, password }) //upload data urlencoded
}

export {
    postCreateNewUser, getAllUser, putUpdateUser, deleteUser,
    getUserWithPaginate, postLogin, postRegister
}