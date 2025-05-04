import React from "react";
import { LinearProgress, Box } from "@mui/material";

const QuizSelection = ({ startQuiz, quizzes }) => {
  // Group quizzes by layer level
  const groupedByLayer = quizzes.reduce((acc, quiz) => {
    const layerKey = `Niveau ${quiz.layer.level + 1}`;
    if (!acc[layerKey]) acc[layerKey] = [];
    acc[layerKey].push(quiz);
    return acc;
  }, {});

  // Sort the layer groups by level (ascending order)
  const sortedLayers = Object.entries(groupedByLayer).sort((a, b) => {
    const levelA = parseInt(a[0].split(" ")[1], 10); // Extract the level number
    const levelB = parseInt(b[0].split(" ")[1], 10); // Extract the level number
    return levelA - levelB; // Compare and sort in ascending order
  });

  return (
    <div id="quizSelection">
      <h2>Selecteer een quiz</h2>
      {sortedLayers.map(([layerName, layerQuizzes]) => (
        <div key={layerName} className="quiz-layer-group">
          <h3>{layerName}</h3>
          <div className="quiz-options">
            {layerQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className={`quiz-option ${quiz.is_unlocked ? "unlocked" : "locked"}`}
                onClick={() => quiz.is_unlocked && startQuiz(quiz.id)}
              >
                <img src={quiz.image_url} alt={quiz.name} />
                <Box sx={{ width: '100%', marginBottom: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min((quiz.completed_attempts / quiz.required_attempts), 1) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: "lightgray",
                      "& .MuiLinearProgress-bar": "green",
                    }}
                  />
                </Box>
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
