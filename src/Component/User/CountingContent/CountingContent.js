import CountDown from './CountDown';
import './CountingContent.scss';
import { useRef } from 'react';

const CountingContent = (props) => {
    const { dataQuiz, handleFinishQuiz, setIndex } = props
    const refDiv = useRef([])

    //het gio!!
    const onTimeUp = () => {
        handleFinishQuiz()
    }

    //set class cho tung cau hoi
    const classQuestion = (quest) => {
        if (quest && quest.answers.length > 0) {
            let isAnswered = quest.answers.find(a => a.isSelected === true)
            if (isAnswered) {
                return "question selected"
            }
        }
        return "question"
    }

    //click quest
    const handleClickQuestion = (index, quest) => {
        setIndex(index)
        //checked
        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question clicked") {
                    item.className = "question"
                }
            })
        }

        //if answered
        if (quest && quest.answers.length > 0) {
            let isAnswered = quest.answers.find(a => a.isSelected === true)
            if (isAnswered) {
                return
            }
        }
        refDiv.current[index].className = "question clicked"

    }

    return (
        <div className="count-content-container">
            <div className="timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="list-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div key={index}
                                className={classQuestion(item)}
                                onClick={() => handleClickQuestion(index, item)}
                                ref={element => refDiv.current[index] = element}
                            >{index + 1}</div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default CountingContent;