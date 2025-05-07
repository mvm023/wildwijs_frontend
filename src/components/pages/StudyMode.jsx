import React, { useState, useEffect } from "react";
import "../../styles/styles.css";
import Quiz from '../Quiz/Quiz';
import AxiosInstance from "../../config/axios";
import SubcategorySelection from "../Quiz/SubcategorySelection";
import CategorySelection from "../Quiz/CategorySelection";


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


const StudyMode = ({GetCategories, categories, GetSubcategories, setSubcategories, subcategories, loading, setLoading}) => {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [quizSessionId, setQuizSessionId] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [score, setScore] = useState(0);
  const [expandedSubcategoryId, setExpandedSubcategoryId] = useState(
    localStorage.getItem('currentSubcategoryId') || null
  );
  

  // Fetch Quizzes based on selected layer
  const GetQuizzes = (subcategoryId) => {
    setLoading(true);
    AxiosInstance.get(`quizzes-by-subcategory/${subcategoryId}/`)
      .then((res) => {
        setQuizzes(res.data);
        localStorage.setItem('quizzes', JSON.stringify(res.data));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setLoading(false);
      });
  };

  const startQuiz = async (quiz_id) => {
    setLoading(true);
    AxiosInstance.get(`startQuiz/${quiz_id}/`,{}
    ).then((response) => {
      const data = response.data
      console.log(data);
      setCurrentQuizId(quiz_id);
      setQuestions(data.questions);
      setQuizSessionId(data.quiz_session_id);
      setCurrentQuestionIndex(0);
      setScore(0);
    }).catch((error) => {
      console.error("Error during login", error)
    })
    setLoading(false);
  };
    
  const endQuiz = async () => {
    if (!currentQuizId) {
      console.warn("No quiz ID found when trying to end quiz.");
      return;
    }
    setLoading(true);
    try {
      await AxiosInstance.post(`endQuiz/${currentQuizId}/`, {});
      const currentSubcategoryId = localStorage.getItem('currentSubcategoryId')
      await GetQuizzes(currentSubcategoryId);
    } catch (error) {
      console.error("Error ending quiz:", error);
    }
    setLoading(false);
  };

  const handleAnswer = (attemptCount, quiz_id) => {
    console.log("Checking answer in StudyMode");
    setScore(score + 1);
    if (attemptCount === 1){
      const newQuestions = questions.filter((_, index) => index !== currentQuestionIndex);
      if (newQuestions.length === 0 ){
        endQuiz(quiz_id);
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

  // Load categories on component mount
  useEffect(() => {
    setLoading(true);
    GetCategories();
    const currentCategoryId = JSON.parse(localStorage.getItem('currentCategoryId'));
    if (currentCategoryId) {
      GetSubcategories(currentCategoryId);
    }
  
    // Clear questions to avoid persistence
    setQuestions([]);
    setLoading(false);
  }, []);
  
  return (
    <div>
      <div className="container">
        {!loading && !questions.length && !subcategories.length && categories.length > 0 && (
          <CategorySelection title={"Categorieën"} categories={categories} GetSubcategories={GetSubcategories}/>
        )}

        {!loading && !questions.length && subcategories.length > 0 && (
          <SubcategorySelection 
            title={"Subcategorieën"} 
            subcategories={subcategories} 
            goBack={() => {setSubcategories([]); localStorage.removeItem('subcategories'); localStorage.removeItem('currentCategoryId'); localStorage.removeItem('currentSubcategoryId'); localStorage.removeItem('expandedSubcategoryId'); setExpandedSubcategoryId(null)}} 
            GetQuizzes={GetQuizzes} 
            startQuiz={startQuiz} 
            expandedSubcategoryId={expandedSubcategoryId}
            setExpandedSubcategoryId={setExpandedSubcategoryId}
            setLoading={setLoading}/>
        )}

        {loading && <LoadingSpinner />}
        {questions.length > 0 && (
          <div>
             <ScoreAndLives score={score} totalQuestions={questions.length} />
             <Quiz quizSessionId={quizSessionId} questions={questions} currentQuestionIndex={currentQuestionIndex} handleAnswer={handleAnswer} exitQuiz={exitQuiz} mode="study"/>
          </div>
        )}
       </div>
    </div>
  );
};

export default StudyMode;
