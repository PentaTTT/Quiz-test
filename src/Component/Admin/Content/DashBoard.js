import './DashBoard.scss';
import { XAxis, Tooltip, CartesianGrid, YAxis, ResponsiveContainer, BarChart, Legend, Bar } from 'recharts'
import { getOverview } from '../../../services/apiService';
import { useState } from 'react';
import { useEffect } from 'react';

const DashBoard = () => {

    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchDataOverview()
    }, [])
    const fetchDataOverview = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT)
            //process data chart
            let Qz = 0, Qs = 0, As = 0;
            Qz = res.DT?.others?.countQuiz ?? 0;
            Qs = res.DT?.others?.countQuestions ?? 0;
            As = res.DT?.others?.countAnswers ?? 0;

            const data = [
                {
                    "name": "Quizzes",
                    Qz: Qz,
                },
                {
                    "name": "Questions",
                    Qs: Qs,
                },
                {
                    "name": "Answers",
                    As: As
                },
            ]

            setDataChart(data)
        }
    }

    return (
        <div className="dashboard-container">
            <div className='dashboard-title'>
                Analytics DashBoard
            </div>

            <div className='dashboard-content'>
                <div className='left-content'>
                    <div className='child'>
                        <span className='text-1'>Total User</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.users
                                && dataOverview.users.total ?
                                <>{dataOverview.users.total}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Quiz</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countQuiz ?
                                <>{dataOverview.others.countQuiz}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Quest</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countQuestions ?
                                <>{dataOverview.others.countQuestions}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Answer</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others
                                && dataOverview.others.countAnswers ?
                                <>{dataOverview.others.countAnswers}</>
                                :
                                <>0</>
                            }
                        </span>
                    </div>
                </div>
                <div className='right-content'>
                    <ResponsiveContainer
                        width='95%'
                        height={'100%'}
                    >
                        <BarChart data={dataChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#ff7300" />
                            <Bar dataKey="Qs" fill="#387908" />
                            <Bar dataKey="As" fill="#CC33CC" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
}

export default DashBoard;