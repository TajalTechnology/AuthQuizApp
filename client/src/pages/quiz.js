import React, { useState, useEffect } from "react";
import axios from 'axios'
import makeToast from "../Toaster"

const Quiz = (props) => {
    const questionRef = React.createRef();
    const questionTypeRef = React.createRef();
    const idRef = React.createRef();
    const optionOneRef = React.createRef();
    const optionTwoRef = React.createRef();
    const optionThreeRef = React.createRef();
    const optionFourRef = React.createRef();


    const createQuestion = async () => {
        const question = questionRef.current.value;
        const user_id = idRef.current.value;
        const question_types = questionTypeRef.current.value;

        const optionOne = optionOneRef.current.value;
        const optionTwo = optionTwoRef.current.value;
        const optionThree = optionThreeRef.current.value;
        const optionFour = optionFourRef.current.value;
        const quizs = [];
        quizs.push(optionOne, optionTwo, optionThree, optionFour)

        await axios.post('http://localhost:3001/api/question-bank', {
            question,
            user_id,
            question_types,
            quizs
        }).then(response => {
            console.log('26', response);
            makeToast("success", response.data.message);
            // props.history.push("/login")
        }).catch(err => {
            makeToast("error", err.response.data.message)
        })
    };




    return (
        <div className="card">

            <form>

                <select ref={questionTypeRef} >
                <option value="" >--Select--</option>
                    <option value="written" >Written</option>
                    <option value="quiz">Quiz</option>
                </select>


                <input
                    type="text"
                    name="question"
                    id="question"
                    placeholder="Types your question here"
                    ref={questionRef} />


                <input
                    type="text"
                    name="user_id"
                    id="user_id"
                    placeholder="Types your id here"
                    ref={idRef} />

             
                    
                    {questionTypeRef !== "written" && 
                    <input
                        type="text"
                        name="optionOne"
                        id="optionOne"
                        placeholder="A:"
                        ref={optionOneRef} />
                    }
                    




                <input
                    type="text"
                    name="optionTwo"
                    id="optionTwo"
                    placeholder="B:"
                    ref={optionTwoRef} />

                <input
                    type="text"
                    name="optionThree"
                    id="optionThree"
                    placeholder="C:"
                    ref={optionThreeRef} />

                <input
                    type="text"
                    name="optionFour"
                    id="optionFour"
                    placeholder="B:"
                    ref={optionFourRef} />

                <input onClick={createQuestion} value="submit" />

            </form>
        </div>
    );
}

export default Quiz;











