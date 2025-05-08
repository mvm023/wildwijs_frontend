import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import AxiosInstance from "../../config/axios";
import QuizSubcategoryEditorForm from "./QuizSubcategoryEditorForm"; // at top of file

const QuizCategoryEditorDialog = ({ openDialog, handleCloseDialog, category }) => {
  const [stage, setStage] = useState(0); // 0: category, 1: subcategories

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [phylums, setPhylums] = useState([]);
  const [classNames, setClassNames] = useState([]);

  const [subcategories, setSubcategories] = useState([]); // Stage 2
  const [deletedSubcategoryIds, setDeletedSubcategoryIds] = useState([]);

  const [currentDeleteSubcategoryId, setCurrentDeleteSubcategoryId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);


  useEffect(() => {
    if (openDialog) {
      if (category) {
        setNewCategoryName(category.name);
        setNewImageUrl(category.image_url);
        setPhylums(category.phylums || []);
        setClassNames(category.class_names || []);
        setSubcategories(category.subcategories || []); // Add this once backend supports it
      } else {
        setNewCategoryName("");
        setNewImageUrl("");
        setPhylums([]);
        setClassNames([]);
        setSubcategories([]);
      }
      setDeletedSubcategoryIds([]);
      setStage(0); // Reset to stage 0 on open
    }
  }, [category, openDialog]);

  const handleCreateOrUpdate = async () => {
    try {
      const categoryData = {
        name: newCategoryName,
        image_url: newImageUrl,
        phylums,
        class_names: classNames,
        subcategories,
        deleted_subcategory_ids: deletedSubcategoryIds.filter((id) => id != null),
      };
  
      let savedCategoryId;
  
      if (category) {
        // Update existing category (with subcategories included)
        const response = await AxiosInstance.put(`/admin-api/quizCategory/${category.id}/`, categoryData);
        savedCategoryId = category.id;
      } else {
        // Create new category (with subcategories included)
        const response = await AxiosInstance.post("/admin-api/quizCategory/", categoryData);
        savedCategoryId = response.data.id;
      }
  
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to save category or subcategories", error);
    }
  };
  
  
  
  const renderStageContent = () => {
    if (stage === 0) {
      return (
        <>
          <TextField
            label="Categorie Naam"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Afbeelding URL"
            fullWidth
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Phylums"
            fullWidth
            value={phylums.join(", ")}
            onChange={(e) =>
              setPhylums(e.target.value.split(",").map((item) => item.trim()))
            }
            margin="normal"
          />
          <TextField
            label="Class Names"
            fullWidth
            value={classNames.join(", ")}
            onChange={(e) =>
              setClassNames(e.target.value.split(",").map((item) => item.trim()))
            }
            margin="normal"
          />
        </>
      );
    } else if (stage === 1) {
      return (
        <>
          <Typography variant="subtitle1">Subcategorieën</Typography>
          {subcategories.map((sub, index) => (
            <QuizSubcategoryEditorForm
              key={index}
              subcategory={sub}
              onChange={(updated) => {
                const updatedSubs = [...subcategories];
                updatedSubs[index] = updated;
                setSubcategories(updatedSubs);
              }}
              onRemove={() => {
                setCurrentDeleteSubcategoryId(subcategories[index]);
                const subToRemove = subcategories[index];
                const filtered = subcategories.filter((_, i) => i !== index);
                setSubcategories(filtered);
                setOpenDeleteDialog(true);
              }}        
            />
          ))}
          <Box mt={2}>
            <Button
              variant="outlined"
              onClick={() =>
                setSubcategories([
                  ...subcategories,
                  {
                    name: "",
                    image_url: "",
                    phylums: phylums,
                    class_names: classNames,
                    orders: [],
                    families: [],
                    genera: [],
                  },
                ])
              }
            >
              Voeg Subcategorie Toe
            </Button>
          </Box>
        </>
      );
    }
  };

  return (
    <div>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {category ? "Bewerk Categorie" : "Voeg Categorie Toe"} — Stap {stage + 1} van 2
        </DialogTitle>
        <DialogContent>{renderStageContent()}</DialogContent>
        <DialogActions>
          {stage > 0 && (
            <Button onClick={() => setStage(stage - 1)} color="primary">
              Terug
            </Button>
          )}
          {stage < 1 ? (
            <Button onClick={() => setStage(stage + 1)} color="primary">
              Volgende
            </Button>
          ) : (
            <Button onClick={handleCreateOrUpdate} color="primary">
              {category ? "Bijwerken" : "Toevoegen"}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => {setOpenDeleteDialog(false); setCurrentDeleteSubcategoryId(null);}}>
        <DialogTitle>Categorie verwijderen</DialogTitle>
        <DialogContent>
          <Typography>Weet je zeker dat je deze categorie wil verwijderen? Dit kan niet ongedaan gemaakt worden.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setCurrentDeleteSubcategoryId(null);
            setOpenDeleteDialog(false);
          }} color="primary">
            Annuleren
          </Button>
          <Button 
            onClick={async () => {
              setDeletedSubcategoryIds((prev) => [...prev, currentDeleteSubcategoryId.id]);
              setOpenDeleteDialog(false);  // Close the dialog after delete
            }}  
            color="primary"
          >
            Bevestigen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default QuizCategoryEditorDialog;
