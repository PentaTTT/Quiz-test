import axios from '../utils/axiosCustomize';

//user account
const postCreateNewUser = (email, password, username, role, image) => {
    const form = new FormData(); //upload file with form-data
    form.append('email', email);
    form.append('password', password);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return axios.post('api/v1/participant', form) //api call
}

const getAllUser = () => {
    return axios.get('api/v1/participant/all')
}

const putUpdateUser = (id, username, role, image) => {
    const form = new FormData(); //upload file with form-data
    form.append('id', id);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return axios.put('api/v1/participant', form) //api call
}

const deleteUser = (id) => {
    return axios.delete('api/v1/participant', { data: { id: id } })
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (email, password) => {
    return axios.post(`api/v1/login`, { email, password }) //upload data urlencoded
}

const postRegister = (username, email, password) => {
    return axios.post(`api/v1/register`, { username, email, password }) //upload data urlencoded
}

const postLogout = (email, refresh_token) => {
    return axios.post('api/v1/logout', {
        email, refresh_token
    })
}

//quiz
const getQuizByUser = () => {
    return axios.get(`/api/v1/quiz-by-participant`);
}

const getDetailQuiz = (id) => {
    return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitQuiz = (data) => {
    return axios.post(`/api/v1/quiz-submit`, { ...data })
}
//--management quiz--
const postCreateNewQuiz = (name, description, difficulty, image) => {
    const form = new FormData(); //upload file with form-data
    form.append('name', name);
    form.append('description', description);
    form.append('difficulty', difficulty);
    form.append('quizImage', image);
    return axios.post('api/v1/quiz', form) //api call
}

// const getQuizWithPaginate = (page, limit) => {
//     return axios.get(`/api/v1/quiz-by-participant?${page}&${limit}`)
// }
const getAllQuiz = () => {
    return axios.get('api/v1/quiz/all')
}

const postCreateNewQuestion = (quiz_id, description, questionImage) => {
    const form = new FormData(); //upload file with form-data
    form.append('quiz_id', quiz_id);
    form.append('description', description);
    form.append('questionImage', questionImage);
    return axios.post('api/v1/question', form) //api call
}
const postCreateNewAnswer = (question_id, description, correct_answer) => {
    return axios.post('api/v1/answer', {
        question_id, description, correct_answer
    })
}

const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', {
        quizId, userId
    })
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data })
}

//dashboard
const getOverview = () => {
    return axios.get('api/v1/overview');
}

export {
    postCreateNewUser, getAllUser, putUpdateUser, deleteUser,
    getUserWithPaginate, postLogin, postRegister, postLogout,
    getQuizByUser, getDetailQuiz, postSubmitQuiz,
    postCreateNewQuiz, getAllQuiz,
    postCreateNewQuestion, postCreateNewAnswer,
    postAssignQuiz, getQuizWithQA, postUpsertQA,
    getOverview
}