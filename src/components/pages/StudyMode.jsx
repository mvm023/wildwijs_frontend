import React, { useState, useEffect } from "react";
import "../../styles/styles.css";
import Quiz from '../Quiz/Quiz';
import QuizSelection from '../QuizSelection';
import API_BASE_URL from "../../config/config";
import AxiosInstance from "../../config/axios";


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


const StudyMode = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [quizSessionId, setQuizSessionId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);

  // Get quizzes from the backend using Axios
  const GetQuizzes = () => {
    AxiosInstance.get("quizzes/")  // Use the correct endpoint for quizzes
      .then((res) => {
        setQuizzes(res.data);      // Set quizzes to state
        setLoading(false);         // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setLoading(false);         // Stop loading even if there is an error
      });
  };

  useEffect(() => {
    GetQuizzes();  // Fetch quizzes on component mount
  }, []);
  
  // Reset the quiz when the component is initialized
    useEffect(() => { setQuestions([]); }, []);

    const startQuiz = async (quiz_id) => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/startQuiz/${quiz_id}/`,{
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        setQuestions(data.questions);
        setQuizSessionId(data.quiz_session_id);
        setCurrentQuestionIndex(0);
        setScore(0);
      } catch (error) {
        console.error("Error starting quiz:", error);
      }
      setLoading(false);
    };
    

    const handleAnswer = (attemptCount) => {
      console.log("Checking answer in StudyMode");
      setScore(score + 1);
      if (attemptCount === 1){
        const newQuestions = questions.filter((_, index) => index !== currentQuestionIndex);
        if (newQuestions.length === 0 ){
          exitQuiz();
          return;
        }
        setQuestions(newQuestions)
      }
      else{
        setQuestions(prev => {
          const newIndex = Math.min(currentQuestionIndex + 5, prev.length - 1); // Move forward 5 spots or to the end
          const updatedArray = [...prev]; // Copy the array
          const [movedItem] = updatedArray.splice(currentQuestionIndex, 1); // Remove the current item
          updatedArray.splice(newIndex, 0, movedItem); // Insert it at the new position
          return updatedArray;
        });
      }

      // Move to the next question (or wrap around if needed)
      setCurrentQuestionIndex(prev => (prev >= questions.length - 1 ? 0 : prev));

   };
    

  const exitQuiz = () => {
    setQuestions([]);
  };

  return (
    <div>
      <div className="container">
        {!loading && !questions.length ? <QuizSelection startQuiz={startQuiz} quizzes={quizzes} /> : null}
        {loading && <LoadingSpinner />}
        {questions.length > 0 && <ScoreAndLives score={score} totalQuestions={questions.length} />}
        {questions.length > 0 && <Quiz quizSessionId={quizSessionId} questions={questions} currentQuestionIndex={currentQuestionIndex} handleAnswer={handleAnswer} exitQuiz={exitQuiz} mode="study"/>}
      </div>
    </div>
  );
};

export default StudyMode;
