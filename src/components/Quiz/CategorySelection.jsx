import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Box
} from "@mui/material";

const CategorySelection = ({ categories, GetSubcategories }) => {
  return (
    <div style={{ marginTop: 20 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={2}>
        {categories.map((category) => {
          const { completed, total } = category.completion_progress || {};

          return (
            <Card key={category.id} sx={{ width: "100%" }}>
              <CardActionArea onClick={() => GetSubcategories(category.id)}>
                <Box sx={{ display: "flex", height: 200, width: "100%" }}>
                  {/* Left side: CardMedia and Typography centered within 75% */}
                  <Box sx={{ width: "75%", position: "relative" }}>
                    <CardMedia
                      component="img"
                      image={category.image_url}
                      alt={category.name}
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
                      {category.name}
                    </Typography>
                  </Box>

                  {/* Right side: Section showing completed/total quiz count */}
                  <Box sx={{ width: "25%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 1 }}>
                    {total > 0 && (
                      <Typography variant="body1" color="textSecondary" sx={{ fontWeight: "bold" }}>
                        Voltooide quizzen: {completed}/{total}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>
    </div>
  );
};

export default CategorySelection;
