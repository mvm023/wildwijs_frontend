import React from "react";
import { LinearProgress, Box, Button, Tooltip, Card, CardContent, CardActionArea } from "@mui/material";

const QuizSelection = ({ startQuiz, quizzes, goBack }) => {
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
      <Box sx={{ marginBottom: 2 }}>
        <Button
          variant="outlined"
          onClick={goBack}
          sx={{
            margin: "10px",
            display: "inline-flex",
            alignItems: "center",
            color: "primary.main",
            borderColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white"
            }
          }}
        >
          Terug
        </Button>
      </Box>

      {sortedLayers.map(([layerName, layerQuizzes]) => (
        <div key={layerName} className="quiz-layer-group">
          <h3>{layerName}</h3>
          <div className="quiz-options">
            {layerQuizzes.map((quiz) => {
              const quizContent = (
                <div style={{width: '150px'}}>
                  <Card className={`quiz-option ${quiz.is_unlocked ? "unlocked" : "locked"}`}>
                    <CardActionArea disabled={!quiz.is_unlocked} onClick={() => quiz.is_unlocked && startQuiz(quiz.id)} sx={{ height: '110px', width: '150px'}}>
                      <img
                        src={quiz.image_url}
                        alt={quiz.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </CardActionArea>
                  </Card>
                  <Box sx={{ width: '100%', marginTop: 1, }}>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min((quiz.completed_attempts / quiz.required_attempts), 1) * 100}
                      sx={{
                        height: 8,
                        borderRadius: 5,
                        backgroundColor: "lightgray",
                      }}
                    />
                  </Box>
                  <p>{quiz.name}</p>
                </div>
              );

              return quiz.is_unlocked ? (
                <div key={quiz.id}>{quizContent}</div>
              ) : (
                <Tooltip
                    key={quiz.id}
                    title="Voltooi alle quizzen in het vorige niveau om deze quiz te ontgrendelen"
                    arrow
                    placement="top"
                  >
                    <div>{quizContent}</div>
                  </Tooltip>

              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizSelection;
