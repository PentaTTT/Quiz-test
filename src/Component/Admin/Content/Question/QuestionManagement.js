import Select from 'react-select';
import './QuestionManagement.scss'
import { useEffect, useState } from 'react';
import { FcPlus } from 'react-icons/fc';
import { TiDelete } from 'react-icons/ti';
import { RiImageAddFill } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from 'react-awesome-lightbox';
import { getAllQuiz, postCreateNewQuestion, postCreateNewAnswer } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const QuestionManagement = () => {
    const [selectedQuiz, setSelectedQuiz] = useState('');
    const initQuestion = [
        {
            id: uuidv4(), description: '', imageFile: '', imageName: '', answers: [
                { id: uuidv4(), description: '', isCorrect: false },
            ]
        }
    ]
    const [questions, setQuestions] = useState(initQuestion)

    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        url: '',
        title: ''
    })
    const [listQuiz, setListQuiz] = useState([])

    useEffect(() => {
        fetchQuiz();
    }, [])
    const fetchQuiz = async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })//build data select input
            setListQuiz(newQuiz)
        }
    }

    const handlePreviewImage = (questId) => {
        let questClone = _.cloneDeep(questions)
        let index = questClone.findIndex(item => item.id === questId)
        if (index > -1) {
            setDataImagePreview({
                url: URL.createObjectURL(questClone[index].imageFile),
                title: questClone[index].imageName
            })
            setIsPreviewImage(true)
        }
    }

    const handleOnclickQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuest = {
                id: uuidv4(), description: '', imageFile: '', imageName: '', answers: [
                    { id: uuidv4(), description: '', isCorrect: false }
                ]
            }

            setQuestions([...questions, newQuest])
        }

        if (type === "REMOVE") {
            let questClone = questions;
            questClone = questClone.filter(q => q.id !== id)
            setQuestions(questClone)
        }
    }
    const handleOnclickAnswer = (type, questId, answerId) => {
        let questClone = _.cloneDeep(questions);

        if (type === "ADD") {
            const newAnswer = {
                id: uuidv4(), description: '', isCorrect: false
            }

            let index = questClone.findIndex(item => item.id === questId)
            if (index > -1) {
                questClone[index].answers.push(newAnswer)
                setQuestions(questClone)
            }
        }

        if (type === "REMOVE") {
            let index = questClone.findIndex(item => item.id === questId)
            questClone[index].answers = questClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questClone)
        }
    }

    const handleOnchange = (type, questId, value) => {
        if (type === 'QUESTION') {
            let questClone = _.cloneDeep(questions); //clone arr
            let index = questClone.findIndex(item => item.id === questId) //tim question trong arr
            if (index > -1) {
                questClone[index].description = value; //gan gtri cap nhat vao o input
                setQuestions(questClone);
            }
        }
    }
    const handleOnchangeFileQuest = (questId, event) => {
        let questClone = _.cloneDeep(questions); //clone arr
        let index = questClone.findIndex(item => item.id === questId) //tim question trong arr

        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questClone[index].imageFile = event.target.files[0]; //gan gtri cap nhat vao o input
            questClone[index].imageName = event.target.files[0].name; //gan gtri cap nhat vao o input
            setQuestions(questClone);
        }
    }
    const handleOnchangeAnswer = (type, answerId, questId, value) => {
        let questClone = _.cloneDeep(questions); //clone arr
        let index = questClone.findIndex(item => item.id === questId) //tim question trong arr
        if (index > -1) {
            questClone[index].answers = questClone[index].answers.map(a => {
                if (a.id === answerId) {
                    if (type === 'CHECKBOX') {
                        a.isCorrect = value
                    }
                    if (type === 'INPUT') {
                        a.description = value
                    }
                }
                return a
            });

            setQuestions(questClone)
        }
    }

    const handleSaveQuest = async () => {
        //validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a quiz!');
            return
        }
        //--validate answer
        let isValidAnswer = true;
        let indexQ = 0, indexA = 0;
        for (let i = 0; i < questions.length; i++) {

            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidAnswer = false;
                    indexA = j;
                    break;
                }
            }
            indexQ = i;
            if (isValidAnswer === false) break;
        }
        if (isValidAnswer === false) {
            toast.error(`Not empty answer ${indexA + 1} at question ${indexQ + 1}`)
            return
        }
        //--validate question
        let isValidQuestion = true;
        let indexQuest = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidQuestion = false;
                indexQuest = i;
                break;
            }
        }
        if (isValidQuestion === false) {
            toast.error(`Not empty at question ${indexQuest + 1}`)
            return
        }

        //submit question
        for (const question of questions) {
            const q = await postCreateNewQuestion(
                +selectedQuiz.value,
                question.description,
                question.imageFile);
            //submit answer
            for (const answer of question.answers) {
                await postCreateNewAnswer(q.DT.id, answer.description, answer.isCorrect)
            }
        }
        toast.success('Create question success!')
        setQuestions(initQuestion)
    }

    return (
        <div className="quest-management-container">
            <div className="title">Quest Management</div>
            <div className='col-4 form-group mx-3 my-3'>
                <label>Select Quiz: </label>
                <Select
                    className='my-2'
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>

            {
                questions && questions.length > 0
                && questions.map((q, index) => {
                    return (
                        <div key={q.id} className='add-new-quest-form'>
                            <div className='question-content mt-2 mx-2 d-flex align-items-center'>
                                <div className="col-6 form-floating mx-2 my-2">
                                    <input type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        value={q.description}
                                        onChange={(event) => handleOnchange('QUESTION', q.id, event.target.value)}
                                    />
                                    <label htmlFor="floatingInput"> Question {index + 1}'s Description</label>
                                </div>
                                <div className="">
                                    <label className='label-upload mx-2 py-2' htmlFor={q.id}><RiImageAddFill /> Upload Image</label>
                                    <input id={q.id} type="file" hidden
                                        onChange={(event) => handleOnchangeFileQuest(q.id, event)} />
                                    <span className='mx-3' style={{ maxWidth: '20px', cursor: 'pointer' }}
                                        onClick={() => handlePreviewImage(q.id)}
                                    >{q.imageName ? q.imageName : '0 file is uploaded'}</span>

                                </div>
                                {questions.length > 1 &&
                                    <div><TiDelete style={{ fontSize: '40px', color: 'red', cursor: 'pointer' }}
                                        onClick={() => handleOnclickQuestion('REMOVE', q.id)}
                                    /></div>
                                }
                            </div>

                            {q.answers && q.answers.length > 0
                                && q.answers.map((a, index) => {
                                    return (
                                        <div key={a.id} className='answer-content mx-4 d-flex align-items-center'>
                                            <input type='checkbox' checked={a.isCorrect}
                                                onChange={(event) => handleOnchangeAnswer('CHECKBOX', a.id, q.id, event.target.checked)}
                                            />
                                            <div className="col-4 form-floating mx-2 my-2">
                                                <input type="text"
                                                    className="form-control"
                                                    id="floatingInput"
                                                    value={a.description}
                                                    onChange={(event) => handleOnchangeAnswer('INPUT', a.id, q.id, event.target.value)}
                                                />
                                                <label className='' htmlFor="floatingInput"> Answer {index + 1}</label>
                                            </div>
                                            <div
                                                onClick={() => handleOnclickAnswer('ADD', q.id)}
                                            ><FcPlus style={{ fontSize: '30px', cursor: 'pointer' }} /></div>
                                            {
                                                q.answers.length > 1 &&
                                                <div
                                                    onClick={() => handleOnclickAnswer('REMOVE', q.id, a.id)}
                                                ><TiDelete style={{ fontSize: '40px', color: 'red', cursor: 'pointer' }} /></div>
                                            }
                                        </div>
                                    )
                                })}
                        </div>
                    )
                })
            }

            <div className='mx-3 mt-2'>
                <button className='btn btn-secondary'
                    onClick={() => handleOnclickQuestion('ADD', '')}
                >Add a new question</button>

                <button className='btn btn-warning mx-3'
                    onClick={() => handleSaveQuest()}
                >
                    Save</button>
            </div>

            {isPreviewImage === true &&
                <Lightbox
                    image={dataImagePreview.url}
                    title={dataImagePreview.title}
                    onClose={() => setIsPreviewImage(false)}
                >
                </Lightbox>
            }
        </div>
    );
}

export default QuestionManagement;