import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import CategorySelection from '../Quiz/CategorySelection'

const SubCategorySelection = ({ title, subcategories, GetQuizzes, goBack }) => {
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
      <CategorySelection title={title} categories={subcategories} GetSubcategories={GetQuizzes}/>
    </div>
  );
};

export default SubCategorySelection;
