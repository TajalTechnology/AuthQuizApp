import React, { useEffect, useState } from "react";
import axios from 'axios'
import makeToast from "../Toaster"
const Answers = (props) => {

    const [questions, setQuestions] = useState([]);
    const [questionCount, setQuestionCount] = useState([]);
    const [checked, setChecked] = useState(false)
    const [answer, setAnswer] = useState([]);
    const totalAnswer =[]
    const quizRef = React.createRef([]);

    // useEffect =(e)=>{
    //     if(e.target.value){
    //         setAnswer(e.target.value)
    //         totalAnswer.push(answer)
    //     }
    // }

    const answerHandler = (e)=>{
        const m = e.target.value
        if(e.target.type === 'checkbox' && e.target.checked){
            console.log('tajal');
            totalAnswer.push(m)
        }
        if(e.target.type === 'checkbox' && !e.target.checked){
            totalAnswer.pop(m)
        }
    }

    const questionCreate =()=>{
        const quiz_answer = totalAnswer;
        const user_id =1
        const question_id =1

        axios.post("http://localhost:3001/api/answer",{
            quiz_answer,
            user_id,
            question_id
        }).then(response =>{
            makeToast("success", response.data.message);
            props.history.push("/login")
        }).catch(err =>{
            makeToast("error", err.response.data.message)
        })
    };

    // const submit =()=>{
    //     const quiz_answer = totalAnswer
    //     const user_id =1
    //     const question_id =1
        
    //     axios.post('http://localhost:3000/api/answer',{
    //         quiz_answer,user_id,question_id}).then(responce =>{
    //             console.log(responce);
    //         })
    // }onChange={answerHandler}
    
//   const handleClick = () => setChecked(!checked)

    useEffect(() => {
        axios.get('http://localhost:3001/api/question-bank')
            .then(response => {
                setQuestionCount(response.data.questions.count)
                setQuestions(response.data.questions.rows)
            })
    }, []);

    return (
        <div>
            {questions?.map((question, index) => (
                <div key={index} >
                    <p>{index + 1}:{question.question}</p>
                    {question?.quizs?.map((quiz, index) => (
                        <div>      
                        <input onChange={answerHandler}  type="checkbox" key={index+1} value={quiz} /><span>{quiz}</span>
                        </div> 
                    
                    ))}
                   
                        <button type="button" onClick={questionCreate} style={{width:85, marginLeft:255}}>SAVE</button>
                        <button type="button" style={{width:85, marginLeft:255}}>Net</button>
                </div>
            ))}
        </div>
    );
}

export default Answers;