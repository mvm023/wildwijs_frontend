import React, { useState, useEffect, useMemo } from "react";
import { shuffleArray } from "../../utils/utils";
import API_BASE_URL from "../../config/config";

const Quiz = ({ animalData, currentQuestionIndex, checkAnswer, exitQuiz, mode }) => {
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
  }, [currentQuestionIndex,animalData]);

  const { name, image, wrongAnswers } = animalData[currentQuestionIndex];

  // Shuffle answers (same for both modes)
  const answers = useMemo(() => {
    return shuffleArray([name, ...wrongAnswers]);
  }, [name, wrongAnswers, shuffleKey]);

  const handleAnswerClick = (answer) => {
    if (disabledAnswers.includes(answer)) return; // Already clicked

    if (answer === name) {
      // Correct answer chosen.
      setFlashedAnswer(answer);
      setTimeout(() => {
        setFlashedAnswer(null);
        if (mode === "study") {
          // Pass the attempt count (plus one since we start at 0) to the parent.
          checkAnswer(answer, attemptCount + 1);
          setAttemptCount(0);
        } else {
          // In quiz mode, simply proceed as before.
          checkAnswer(answer);
        }
      }, 500);
    } else {
      // Wrong answer.
      // Increase attempt count (only matters in study mode)
      setAttemptCount(prev => prev + 1);
      // Disable the wrong answer so it can't be clicked again in this attempt.
      setDisabledAnswers(prev => [...prev, answer]);
      if (mode === "quiz") {
        checkAnswer(answer);
      }
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
