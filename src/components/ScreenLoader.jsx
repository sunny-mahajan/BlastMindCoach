import { CircularProgress, Box } from "@mui/material";
import React from "react";

const ScreenLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <CircularProgress
        size={60}
        thickness={4}
        sx={{
          color: "red",
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />
    </Box>
  );
};

export default ScreenLoader;
