import React, { useEffect, useState } from "react";
import { Typography, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router";

const Admin = ({ user, userLoading }) => {
  const navigate = useNavigate();

  // Wait for user data to load, then handle redirection if necessary
  useEffect(() => {
    if (!userLoading) { // Only check once user data is loaded
      if (!user || !user.is_admin) {
        navigate("/"); // Redirect if not an admin or not logged in
      }
    }
  }, [user, userLoading, navigate]);

  // While loading user data
  if (userLoading) {
    return (
      <Box mt={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  // Render the admin page once the user is authenticated and is an admin
  return (
    <Box mt={4} textAlign="center">
      <Typography variant="h4" color="primary">
        Welkom admin
      </Typography>
    </Box>
  );
};

export default Admin;
