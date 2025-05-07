import React, { useEffect, useState } from "react";
import AxiosInstance from "../../config/axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const QuizCategoryEditor = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await AxiosInstance.get("/admin-api/quizcategory/");
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (editingId) {
        await AxiosInstance.put(`/admin/quizcategory/${editingId}/`, {
          name: newCategoryName
        });
      } else {
        await AxiosInstance.post("/admin/quizcategory/", {
          name: newCategoryName
        });
      }
      setNewCategoryName("");
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.error("Failed to save category", error);
    }
  };

  const handleEdit = (category) => {
    setNewCategoryName(category.name);
    setEditingId(category.id);
  };

  const handleDelete = async (id) => {
    try {
      await AxiosInstance.delete(`/admin/quizcategory/${id}/`);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h5">Beheer quizcategorieën</Typography>
      <Box mt={2} display="flex" gap={2}>
        <TextField
          label="Categorie naam"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <Button variant="contained" onClick={handleCreateOrUpdate}>
          {editingId ? "Bijwerken" : "Toevoegen"}
        </Button>
      </Box>

      <List>
        {categories.map((cat) => (
          <ListItem
            key={cat.id}
            secondaryAction={
              <>
                <IconButton onClick={() => handleEdit(cat)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(cat.id)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default QuizCategoryEditor;
