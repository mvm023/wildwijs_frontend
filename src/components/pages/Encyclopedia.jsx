import { React, useState, useEffect } from "react";
import AxiosInstance from "../../config/axios";
import { TextField, Autocomplete, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import API_BASE_URL from "../../config/config";

const Encyclopedia = () => {
  const [organisms, setOrganisms] = useState([]); // Store all organisms
  const [filteredOrganism, setFilteredOrganism] = useState(null); // Store selected organism

  // Get the data from the backend
  const GetData = () => {
    AxiosInstance.get("organism/").then((res) => {
      setOrganisms(res.data);
      setFilteredOrganism(res.data[0]); // Set the first organism as default
    });
  };

  // On initial render, get the data
  useEffect(() => {
    GetData();
  }, []);

  return (
    <Grid container spacing={2} sx={{ backgroundColor: "#ffff", padding: "30px" }}>
    <Grid size={12}>
    <Autocomplete
      disablePortal
      options={organisms}
      getOptionLabel={(option) => option.name} // Extract the name field
      sx={{ width: "100%" }}
      value={filteredOrganism} // Bind state to selected value
      onChange={(event, newValue) => setFilteredOrganism(newValue)} // Update state on selection
      renderInput={(params) => <TextField {...params} label="Vind een soort" />}
    />
  </Grid>

  {/* Flex container for text & image */}
  {filteredOrganism && (
    <Grid size={12} sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      {/* Text on the left */}
      <div style={{ flex: 1, textAlign: "left" }}>
        <Typography sx={{ fontWeight: "bold" }}>
          {filteredOrganism.name}{" "}
          <span style={{ color: "gray" }}>({filteredOrganism.scientific_name})</span>
        </Typography>

        <Typography sx={{ marginTop: "8px" }} dangerouslySetInnerHTML={{ __html: filteredOrganism.description }} />
      </div>

      {/* Image on the right */}
      <img
        style={{ width: "250px", height: "250px", objectFit: "cover", marginLeft: "20px" }}
        src={`${filteredOrganism.image_url}`}
        alt={filteredOrganism.name}
      />
    </Grid>
  )}
</Grid>

  );
};

export default Encyclopedia;
