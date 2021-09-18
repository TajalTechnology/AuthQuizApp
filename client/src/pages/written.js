import React, { useState, useEffect } from "react";
import axios from 'axios'
import makeToast from "../Toaster"

const Written = (props) => {
    const questionRef = React.createRef();
    const questionTypeRef = React.createRef();
    const idRef = React.createRef();


    const createQuestion = async () => {
        const question = questionRef.current.value;
        const user_id = idRef.current.value;
        const question_types = questionTypeRef.current.value;

        await axios.post('http://localhost:3001/api/question-bank', {
            question,
            user_id,
            question_types
        }).then(response => {
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


                <input onClick={createQuestion} value="submit" />

            </form>
        </div>
    );
}

export default Written;











