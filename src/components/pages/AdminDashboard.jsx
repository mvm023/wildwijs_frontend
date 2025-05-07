import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router";
import QuizCategoryEditor from "../Admin/QuizCategoryEditor";

const AdminDashboard = ({ user, userLoading }) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);

  // Redirect if user is not admin
  useEffect(() => {
    if (!userLoading && (!user || !user.is_admin)) {
      navigate("/");
    }
  }, [user, userLoading, navigate]);

  if (userLoading) {
    return (
      <Box mt={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box mt={4} mx="auto" maxWidth="md">
      <Typography variant="h4" color="primary" gutterBottom textAlign="center">
        Admin Dashboard
      </Typography>

      <Paper elevation={3}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Categorieën" />
          {/* Add more tabs as needed */}
        </Tabs>

        <Box p={3}>
          {tabIndex === 0 && <QuizCategoryEditor />}
          {/* Future: {tabIndex === 1 && <QuizSubcategoryEditor />} */}
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
