import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
  Button,
  Collapse
} from "@mui/material";
import QuizSelection from "../Quiz/QuizSelection";
import AxiosInstance from "../../config/axios";

const SubCategorySelection = ({ title, subcategories, goBack, startQuiz }) => {
  const [expandedSubcategoryId, setExpandedSubcategoryId] = useState(null);
  const [subcategoryQuizzes, setSubcategoryQuizzes] = useState({});
  const [loadingQuizzes, setLoadingQuizzes] = useState({});

  const toggleExpansion = async (subcategoryId) => {
    if (expandedSubcategoryId === subcategoryId) {
      setExpandedSubcategoryId(null); // Collapse
    } else {
      setExpandedSubcategoryId(subcategoryId); // Expand new one
      if (!subcategoryQuizzes[subcategoryId]) {
        setLoadingQuizzes(prev => ({ ...prev, [subcategoryId]: true }));
        try {
          const res = await AxiosInstance.get(`quizzes-by-subcategory/${subcategoryId}/`);
          setSubcategoryQuizzes(prev => ({
            ...prev,
            [subcategoryId]: res.data
          }));
        } catch (error) {
          console.error("Error fetching quizzes:", error);
        }
        setLoadingQuizzes(prev => ({ ...prev, [subcategoryId]: false }));
      }
    }
  };

  return (
    <div>
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
      <div style={{ marginTop: 20 }}>
        <Typography variant="h3">{title}</Typography>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
          {subcategories.map((subcategory) => {
            const { completed, total } = subcategory.completion_progress || {};
            const isExpanded = expandedSubcategoryId === subcategory.id;

            return (
              <Box key={subcategory.id} sx={{ width: "100%" }}>
                <Card>
                  <CardActionArea onClick={() => toggleExpansion(subcategory.id)}>
                    <Box sx={{ display: "flex", height: 160, width: "100%" }}>
                      <Box sx={{ width: "75%", position: "relative" }}>
                        <CardMedia
                          component="img"
                          image={subcategory.image_url}
                          alt={subcategory.name}
                          sx={{
                            height: "100%",
                            width: "100%",
                            objectFit: "cover",
                            filter: "brightness(0.7)"
                          }}
                        />
                        <Typography
                          variant="h5"
                          component="div"
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "white",
                            fontWeight: "bold",
                            textShadow: "0 0 6px rgba(0,0,0,0.7)"
                          }}
                        >
                          {subcategory.name}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          width: "25%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          padding: 1
                        }}
                      >
                        {total > 0 && (
                          <Typography
                            variant="body1"
                            color="textSecondary"
                            sx={{ fontWeight: "bold" }}
                          >
                            Voltooide quizzen: {completed}/{total}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </CardActionArea>
                </Card>

                {/* Expandable quiz list */}
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <Box mt={2}>
                    {loadingQuizzes[subcategory.id] ? (
                      <Typography variant="body2" sx={{ padding: 2 }}>
                        Quizzen laden...
                      </Typography>
                    ) : (
                      subcategoryQuizzes[subcategory.id] && (
                        <QuizSelection
                          quizzes={subcategoryQuizzes[subcategory.id]}
                          startQuiz={(quizId) => startQuiz(quizId)}
                          goBack={() => setExpandedSubcategoryId(null)}
                        />
                      )
                    )}
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </Box>
      </div>
    </div>
  );
};

export default SubCategorySelection;
