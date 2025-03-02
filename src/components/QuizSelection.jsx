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
              onClick={() => startQuiz(quiz.className, quiz.type)}
            >
              <img src={`${API_BASE_URL}/media/images/thumbnails/${quiz.img}`} alt={quiz.title} />
              <p>{quiz.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default QuizSelection;
