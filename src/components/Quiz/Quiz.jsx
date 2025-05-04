import React, { useState, useEffect, useMemo } from "react";
import { shuffleArray } from "../../utils/utils";
import API_BASE_URL from "../../config/config";

const Quiz = ({ quizSessionId, questions, currentQuestionIndex, handleAnswer, exitQuiz, mode, quizId }) => {
  // For both modes, we track disabled answers and the flash effect.
  const [disabledAnswers, setDisabledAnswers] = useState([]);
  const [flashedAnswer, setFlashedAnswer] = useState(null);
  // For study mode, track how many attempts have been made on the current question.
  const [attemptCount, setAttemptCount] = useState(0);
  const [shuffleKey, setShuffleKey] = useState(0);

  // Reset state when the question changes.
  useEffect(() => {
    setDisabledAnswers([]);
    setFlashedAnswer(null);
    setAttemptCount(0);
    setShuffleKey(prev => prev + 1);
  }, [currentQuestionIndex,questions]);

  const { image, options, question_id } = questions[currentQuestionIndex];

  // Shuffle answers (same for both modes)
  const answers = useMemo(() => {
    return shuffleArray(options);  // options contains both correct and wrong answers
  }, [options, shuffleKey]);


  const handleAnswerClick = async (answer) => {
    if (disabledAnswers.includes(answer)) return;
    console.log(`Alright you clicked on answer ${answer}`);
  
    // Send answer to backend to check correctness
    const response = await fetch(`${API_BASE_URL}/answerQuestion/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quiz_session_id: quizSessionId,
        question_id: question_id,
        selected: answer,
      }),
      credentials: "include",
    });
  
    const data = await response.json();
  
    if (data.correct) {
      setFlashedAnswer(answer);
      setTimeout(() => {
        setFlashedAnswer(null);
        if (mode === "study") {
          handleAnswer(attemptCount + 1, quizId); // Pass attempt count in study mode
          setAttemptCount(0);
        } 
        else {
          handleAnswer(answer, quizId); // Proceed with quiz mode logic
        }
      }, 500);
    } 
    else {
      setAttemptCount(prev => prev + 1);
      setDisabledAnswers(prev => [...prev, answer]);
    }
  };

  return (
    <div className="quiz-container">
      <div className="question-container">
        <img src={image} alt="Animal" className="question-image" />
        <ul className="options">
          {answers.map((answer, index) => (
            <li
              key={index}
              onClick={() => handleAnswerClick(answer)}
              style={{
                cursor: disabledAnswers.includes(answer) ? "not-allowed" : "pointer",
                backgroundColor: flashedAnswer === answer 
                  ? "#4caf50" 
                  : (disabledAnswers.includes(answer) ? "#e33232" : ""),
              }}
            >
              {answer}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={exitQuiz} className="exit-button">Afsluiten</button>
    </div>
  );
};

export default Quiz;
