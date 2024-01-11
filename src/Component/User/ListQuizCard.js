import { useEffect, useState } from "react";
import { getQuizByUser } from '../../services/apiService';
import './ListQuizCard.scss'
import { useNavigate } from "react-router-dom";

const ListQuiz = () => {
    const [listQuiz, setListQuiz] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getQuizData()
    }, [])

    const getQuizData = async () => {
        let res = await getQuizByUser();
        if (res && res.EC === 0)
            setListQuiz(res.DT)
    }

    return (
        <>
            {/* {console.log('check data', listQuiz)} */}
            <div className="card-container">

                {listQuiz && listQuiz.length > 0 &&
                    listQuiz.map((item, index) => {
                        return (

                            <div key={index} className="card" style={{ width: '18rem' }}>
                                <img src={`data:image/jpeg;base64,${item.image}`} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Quiz {item.id}</h5>
                                    <p className="card-text">{item.description}</p>
                                </div>
                                <div className="card-btn mx-3 my-2">
                                    <button className="btn btn-primary"
                                        onClick={() => { navigate(`/quiz/${item.id}`, { state: { quizTitle: item.description } }) }}
                                    >Get started</button>
                                </div>
                            </div>

                        )
                    })
                }

                {listQuiz && listQuiz.length === 0 &&
                    <div className="text-warning">You don't have any quiz left</div>
                }
            </div>
        </>
    );
}

export default ListQuiz;