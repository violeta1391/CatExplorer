import React from "react";
import { Box, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <Box textAlign="center" mb={4}>
      <Typography variant="h4" color="primary">
        Cat Explorer 🐾
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Explore different cat breeds by name and origin
      </Typography>
    </Box>
  );
};

export default Header;
