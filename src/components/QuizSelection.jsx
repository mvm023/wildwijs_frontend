import React from "react";

const QuizSelection = ({ startQuiz, quizzes }) => {
  // Group quizzes by layer level
  console.log(quizzes); // Check if level data is coming through

  const groupedByLayer = quizzes.reduce((acc, quiz) => {
    const layerKey = `Niveau ${quiz.layer.level}`;
    if (!acc[layerKey]) acc[layerKey] = [];
    acc[layerKey].push(quiz);
    return acc;
  }, {});

  return (
    <div id="quizSelection">
      <h2>Selecteer een quiz</h2>
      {Object.entries(groupedByLayer).map(([layerName, layerQuizzes]) => (
        <div key={layerName} className="quiz-layer-group">
          <h3>{layerName}</h3>
          <div className="quiz-options">
            {layerQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="quiz-option"
                onClick={() => startQuiz(quiz.id)}
              >
                <img src={quiz.image_url} alt={quiz.name} />
                <p>{quiz.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizSelection;
