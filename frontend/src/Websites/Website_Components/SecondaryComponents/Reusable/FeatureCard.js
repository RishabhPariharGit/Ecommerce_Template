import React from "react";
import './Reusable.css'
import { Box, Typography } from "@mui/material";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Box textAlign="center" px={2} py={3}>
      <Box
        component="img"
        src={icon}
        alt={title}
        sx={{ width: 48, height: 48, mb: 2 }}
      />
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
};

export default FeatureCard;