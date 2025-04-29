import React from "react";
import API_BASE_URL from "../config/config";

const QuizSelection = ({ startQuiz, quizzes }) => {

    return (
      <div id="quizSelection">
        <h2>Selecteer een quiz</h2>
        <div className="quiz-options">
          {quizzes.map((quiz, index) => (
            <div
              key={index}
              className="quiz-option"
              onClick={() => startQuiz(quiz.id)}
            >
              <img src={quiz.image_url} alt={quiz.name} />
              <p>{quiz.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default QuizSelection;
