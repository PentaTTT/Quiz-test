import _ from 'lodash';
import { useState } from 'react';
import Lightbox from 'react-awesome-lightbox';

const Question = (props) => {
    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const { data, index, handleCheckboxProps, } = props;

    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }

    const handleCheckbox = (event, aId, qId) => {
        handleCheckboxProps(aId, qId)
    }
    const handleOnClickImagePreview = () => {
        setIsPreviewImage(true)
    }

    return (
        <div className="question-container">
            {
                data.image ?
                    <div className="image py-3">
                        <img src={`data: image/jpeg;base64, ${data.image}`}
                            alt="Quiz question"
                            style={{ cursor: 'pointer' }}
                            onClick={handleOnClickImagePreview}
                        />
                        {isPreviewImage === true &&
                            <Lightbox
                                image={`data: image/jpeg;base64, ${data.image}`}
                                title={"Question Image"}
                                onClose={() => setIsPreviewImage(false)}
                            >
                            </Lightbox>
                        }
                    </div>
                    :
                    <div className="image py-3">

                    </div>
            }

            <div className="question">Question {index + 1}: {data.questionDescription}</div>
            <div className="answers">
                {
                    data.answers && data.answers.length > 0 &&
                    data.answers.map((answers, index) => {
                        return (
                            <div key={index} className="answer-option">
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    id={index + 1}
                                    checked={answers.isSelected}
                                    onChange={(event) => handleCheckbox(event, answers.id, data.questionId)}
                                />
                                <label className='form-check-label mx-2' htmlFor={index + 1}>
                                    {answers.description}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Question;