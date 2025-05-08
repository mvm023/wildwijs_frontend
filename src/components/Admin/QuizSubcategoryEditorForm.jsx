import { Box, IconButton, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const QuizSubcategoryEditorForm = ({ subcategory, onChange, onRemove }) => {
  const handleChange = (field, value) => {
    onChange({ ...subcategory, [field]: value });
  };

  const handleListChange = (field, value) => {
    const list = value.split(",").map((item) => item.trim());
    handleChange(field, list);
  };

  return (
    <Box border={1} borderRadius={2} borderColor="grey.300" padding={2} marginBottom={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={1}>
        <Typography variant="subtitle1">Subcategorie: {subcategory.name || "Nieuw"}</Typography>
        <IconButton onClick={onRemove} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>

      <TextField
        label="Naam"
        fullWidth
        value={subcategory.name}
        onChange={(e) => handleChange("name", e.target.value)}
        margin="normal"
      />
      <TextField
        label="Afbeelding URL"
        fullWidth
        value={subcategory.image_url}
        onChange={(e) => handleChange("image_url", e.target.value)}
        margin="normal"
      />
      <TextField
        label="Phylums"
        fullWidth
        value={(subcategory.phylums || []).join(", ")}
        onChange={(e) => handleListChange("phylums", e.target.value)}
        margin="normal"
      />
      <TextField
        label="Class Names"
        fullWidth
        value={(subcategory.class_names || []).join(", ")}
        onChange={(e) => handleListChange("class_names", e.target.value)}
        margin="normal"
      />
      <TextField
        label="Orders"
        fullWidth
        value={(subcategory.orders || []).join(", ")}
        onChange={(e) => handleListChange("orders", e.target.value)}
        margin="normal"
      />
      <TextField
        label="Families"
        fullWidth
        value={(subcategory.families || []).join(", ")}
        onChange={(e) => handleListChange("families", e.target.value)}
        margin="normal"
      />
      <TextField
        label="Genera"
        fullWidth
        value={(subcategory.genera || []).join(", ")}
        onChange={(e) => handleListChange("genera", e.target.value)}
        margin="normal"
      />
    </Box>
  );
};

export default QuizSubcategoryEditorForm;
