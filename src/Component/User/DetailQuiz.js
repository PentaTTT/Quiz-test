import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDetailQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import './DetailQuiz.scss';
import Question from "./Question";
import ModalResult from "./ModalResult";
import CountingContent from "./CountingContent/CountingContent";

const DetailQuiz = () => {
    const params = useParams()
    const quizId = params.id;

    const location = useLocation();

    const [dataQuiz, setDataQuiz] = useState('');
    const [index, setIndex] = useState(0);
    const [isShowModalResult, setIsShowModalResult] = useState(false)
    const [dataModalResult, setDataModalResult] = useState('')

    useEffect(() => {
        const fetchQuestion = async () => {
            let res = await getDetailQuiz(quizId)
            // console.log('check data quiz: ', res)

            if (res && res.EC === 0) {
                let rawDT = res.DT;
                let data = _.chain(rawDT)
                    .groupBy('id')
                    .map((value, key) => {
                        let answers = [];
                        let questionDescription, image = null;

                        value.forEach((item, index) => {
                            if (index === 0) {
                                questionDescription = item.description;
                                image = item.image
                            }
                            item.answers.isSelected = false;
                            answers.push(item.answers)
                        })
                        answers = _.orderBy(answers, ['id'], ['asc']); //order by theo id answer tang dan
                        return { questionId: key, answers, questionDescription, image }

                    })
                    .value() //convert lai data
                // console.log('data: ', data)
                setDataQuiz(data)
            }
        }
        fetchQuestion()

    }, [quizId])

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            let answer = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
            question.answers = answer;
            // console.log('check answer update', answer)
        }

        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone)
        }
    }

    const handlePrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1)
    }
    const handleNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }

    const handleFinishQuiz = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answer = [];

        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];

                question.answers.forEach(item => {
                    if (item.isSelected === true) {
                        userAnswerId.push(item.id)
                    }
                })
                answer.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
        }

        payload.answers = answer

        //submit api
        let res = await postSubmitQuiz(payload)
        if (res && res.EC === 0) {
            console.log('check res', res)
            setDataModalResult({
                countTotal: res.DT.countTotal,
                countCorrect: res.DT.countCorrect,
                quizData: res.DT.quizData
            })
            setIsShowModalResult(true)
        } else {
            alert('Something wrong..')
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className="content-left">
                <div className="title">Quiz {quizId}: {location?.state?.quizTitle}</div>
                <div className="content">
                    <Question
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                        index={index}
                        setIndex={setIndex}
                        handleCheckboxProps={handleCheckbox}
                    />
                </div>
                <div className="button my-2">
                    <button className="btn btn-primary" onClick={() => handlePrev()}>Prev</button>
                    <button className="btn btn-secondary" onClick={() => handleNext()}>Next</button>
                    {
                        // dataQuiz && dataQuiz.length === +index - 1 &&
                        <button className="btn btn-warning" onClick={() => handleFinishQuiz()}>Finish</button>
                    }
                </div>
            </div>
            <div className="content-right">
                <div className="content">
                    <CountingContent
                        dataQuiz={dataQuiz}
                        handleFinishQuiz={handleFinishQuiz}
                        setIndex={setIndex}
                    />
                </div>
            </div>

            <ModalResult
                show={isShowModalResult}
                setShow={setIsShowModalResult}
                dataModal={dataModalResult}
            />
        </div>
    );
}

export default DetailQuiz;