import React, { useState, useEffect } from "react";
import "../../styles/styles.css";
import Quiz from '../Quiz/Quiz';
import QuizSelection from '../Quiz/QuizSelection';
import API_BASE_URL from "../../config/config";

  const quizzes = [
    { className: "Aves", type: "both", title: "Alle vogels", img: "birds_both.jpg" },
    { className: "Aves", type: "native", title: "Oorspronkelijke vogels", img: "birds_native.jpg" },
    { className: "Aves", type: "invasive", title: "Exoten", img: "birds_invasive.jpg" },
    { className: "Mammalia", type: "both", title: "Alle zoogdieren", img: "mammals_both.jpg" },
    { className: "Mammalia", type: "native", title: "Oorspronkelijke zoogdieren", img: "mammals_native.jpg" },
    { className: "Mammalia", type: "invasive", title: "Exoten", img: "mammals_invasive.jpg" },
  ]

const LoadingSpinner = () => (
  <div id="loadingSpinner" className="spinner-container">
    <div className="spinner"></div>
    <p>Quiz laden...</p>
  </div>
);

const ScoreAndLives = ({ score, lives, totalQuestions }) => {
  const progressPercentage = (score / totalQuestions) * 100;

  return (
    <div className="score-and-lives">
      <div className="score-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
      <div className="lives-container">
        <div className="block-bar">
          {[...Array(3)].map((_, i) => (
            <img
              key={i}
              src={i < lives ? `${API_BASE_URL}/media/images/icons/heart_full.svg` : `${API_BASE_URL}/media/images/icons/heart_empty.svg`}
              alt="Heart"
              className="heart-icon"
            />
          ))}
        </div>
      </div>
    </div>
  );
};



const QuizMode = () => {
  const [animalData, setAnimalData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [loading, setLoading] = useState(false);

  // Reset the quiz when the component is initialized
  useEffect(() => { setAnimalData([]); }, []);

  const startQuiz = async (animalClass, occurrenceStatusType) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/getAnimalData/${animalClass}/${occurrenceStatusType}/20`);
      const data = await response.json();
      console.log(data);
      setAnimalData(data);
      setCurrentQuestionIndex(0);
      setScore(0);
      setLives(3);
    } catch (error) {
      console.error("Error fetching animal data:", error);
    }
    setLoading(false);
  };

  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === animalData[currentQuestionIndex].name) {
      if (currentQuestionIndex + 1 < animalData.length){
        setScore(score + 1);
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
      else{
        exitQuiz();
      }
    } else {
      setLives(lives - 1);
      if (lives - 1 < 0){
        alert(`Game Over! Your final score is ${score}/${animalData.length}`);
        exitQuiz();
      }
    }
  };

  const exitQuiz = () => {
    setAnimalData([]);
  };

  return (
    <div>
      <div className="container">
        {!loading && !animalData.length ? <QuizSelection startQuiz={startQuiz} quizzes={quizzes}/> : null}
        {loading && <LoadingSpinner />}
        {animalData.length > 0 && <ScoreAndLives score={score} lives={lives} totalQuestions={animalData.length} />}
        {animalData.length > 0 && <Quiz animalData={animalData} currentQuestionIndex={currentQuestionIndex} checkAnswer={checkAnswer} exitQuiz={exitQuiz} mode="quiz" />}
      </div>
    </div>
  );
};

export default QuizMode;
