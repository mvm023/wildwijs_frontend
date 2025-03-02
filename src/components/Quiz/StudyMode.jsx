import React, { useState } from "react";
import "../../styles/styles.css";
import Quiz from './Quiz';
import QuizSelection from '../QuizSelection';
import API_BASE_URL from "../../config/config";

  const quizzes = [
    { className: "Aves", type: "birdsOfPrey", title: "Roofvogels", img: "birds_of_prey.jpg" },
  ];

const LoadingSpinner = () => (
  <div id="loadingSpinner" className="spinner-container">
    <div className="spinner"></div>
    <p>Quiz laden...</p>
  </div>
);

const ScoreAndLives = ({ score, totalQuestions }) => {
  const progressPercentage = (score / (score + totalQuestions)) * 100;

  return (
    <div className="score-and-lives">
      <div className="score-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};


const App = () => {
  const [animalData, setAnimalData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  

  const startQuiz = async (animalClass, type) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/getAnimalData/${animalClass}/${type}/50`);
      const data = await response.json();
      console.log(data);
      setAnimalData(data);
      setCurrentQuestionIndex(0);
      setScore(0);
    } catch (error) {
      console.error("Error fetching animal data:", error);
    }
    setLoading(false);
  };

  const checkAnswer = (selectedAnswer, attempts) => {
    if (selectedAnswer === animalData[currentQuestionIndex].name) {
      setScore(score + 1);
      if (attempts === 1) {
        // Remove this question from the study set (answered correctly on the first try)
        const newQuestions = animalData.filter((_, index) => index !== currentQuestionIndex);
        setAnimalData(newQuestions);

        if (newQuestions.length === 0) {
          // If no questions remain, exit study mode
          exitQuiz();
          return;
        }
      } else {
        // Move the question to the end of the list (to retry later)
        setAnimalData(prev => {
          const newIndex = Math.min(currentQuestionIndex + 5, prev.length - 1); // Move forward 5 spots or to the end
          const updatedArray = [...prev]; // Copy the array
          const [movedItem] = updatedArray.splice(currentQuestionIndex, 1); // Remove the current item
          updatedArray.splice(newIndex, 0, movedItem); // Insert it at the new position
          return updatedArray;
        });
      }

      // Move to the next question (or wrap around if needed)
      setCurrentQuestionIndex(prev => (prev >= animalData.length - 1 ? 0 : prev));
    }
  };

  const exitQuiz = () => {
    setAnimalData([]);
  };

  return (
    <div>
      <div className="container" style={{ marginTop: "90px" }}>
        {!loading && !animalData.length ? <QuizSelection startQuiz={startQuiz} quizzes={quizzes} /> : null}
        {loading && <LoadingSpinner />}
        {animalData.length > 0 && <ScoreAndLives score={score} totalQuestions={animalData.length} />}
        {animalData.length > 0 && <Quiz animalData={animalData} currentQuestionIndex={currentQuestionIndex} checkAnswer={checkAnswer} exitQuiz={exitQuiz} mode="study"/>}
      </div>
    </div>
  );
};

export default App;
