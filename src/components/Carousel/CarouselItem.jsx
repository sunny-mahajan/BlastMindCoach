import React from "react";
import { Box, Typography } from "@mui/material";
import PlayerOverlay from "../Movies/PlayerOverlay";
import PlayerVideo from "../Movies/PlayerVideo";

const CarouselItem = ({
  title = "Top Items",
  icon = "",
  report = "Tool",
  item,
}) => {
  return (
    <Box
      sx={{
        width: { xs: 120, sm: 180 },
        height: 120,
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        border: "2px solid #E0E0E0",
        position: "relative",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
        },
      }}
    >
      {/* Content section */}
      <Box
        sx={{
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <Typography
          sx={{ fontWeight: 600, color: "#2c3e50", fontSize: "1rem" }}
        >
          {title}
        </Typography>
        <Box
          component="img"
          src={icon}
          alt="icon"
          sx={{
            width: 60,
            height: 60,
            objectFit: "contain",
            ml: 2,
            cursor: "pointer",
          }}
        />
      </Box>

      {/* Footer tag */}
      <Box
        sx={{
          backgroundColor: "#d6e885",
          padding: "6px 12px",
          textAlign: "left",
          fontSize: "0.8rem",
          color: "#1d1d1f",
          borderTop: "1px solid #ccc",
        }}
      >
        {report}
      </Box>
    </Box>
  );
};

export default CarouselItem;
