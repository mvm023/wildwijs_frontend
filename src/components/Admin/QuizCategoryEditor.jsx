import React, { useEffect, useState } from "react";
import AxiosInstance from "../../config/axios";
import QuizCategoryEditorDialog from "./QuizCategoryEditorDialog";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const QuizCategoryEditor = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await AxiosInstance.get("/admin-api/quizCategory/");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`/admin-api/quizCategory/${id}/`);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  const handleCloseDialog = () => {
    setEditingCategory(null);
    fetchCategories();
    setOpenDialog(false);
  };

  const getCategoryForEditing = async (category_id) => {
    try{
        const response = await AxiosInstance.get(`/admin-api/quizCategory/${category_id}/`);
        setEditingCategory(response.data);
        return;
    } catch (error) {
      console.error("Something went wrong when fetching the category", error)
    }
  };

  // Handle opening dialog for creating a new category
  const handleCreateNewCategory = () => {
    setOpenDialog(true); // Open dialog for creating
  };

  return (
    <Box mt={4}>
      <Typography variant="h5">Beheer quizcategorieën</Typography>
      
      {/* Button to open dialog for creating a new category */}
      <Box mt={2} mb={2}>
        <Button variant="contained" color="primary" onClick={handleCreateNewCategory}>
          Nieuwe Categorie Maken
        </Button>
      </Box>

      <List>
        {categories.map((cat) => (
          <ListItem
            key={cat.id}
            secondaryAction={
              <>
                <IconButton onClick={async () => { await getCategoryForEditing(cat.id); setOpenDialog(true)}}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => {setDeleteCategoryId(cat.id);  setOpenDeleteDialog(true);}}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>

      <QuizCategoryEditorDialog
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        category={editingCategory}
      />


      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Categorie verwijderen</DialogTitle>
        <DialogContent>
          <Typography>Weet je zeker dat je deze categorie wil verwijderen? Dit kan niet ongedaan gemaakt worden.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Annuleren
          </Button>
          <Button 
            onClick={async () => {handleDelete(deleteCategoryId)
              setOpenDeleteDialog(false);  // Close the dialog after delete
            }}  
            color="primary"
          >
            Bevestigen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuizCategoryEditor;
