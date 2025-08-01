import React, { useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import AssessmentResultsScorecard from "./AssessmentResultsScorecard";
import AssessmentCard from "./AssessmentCard";

// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "98%", sm: "90%", md: "80%" },
  maxWidth: 800,
  bgcolor: "#4CAF50",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

// Screens mapping
const SCREENS = {
  0: WelComeScreen,
  1: AssessmentCard,
  2: AssessmentResultsScorecard,
};

const renderScreen = (screen, setScreen, assessmentData, setAssessmentData) => {
  const ScreenComponent = SCREENS[screen] || WelComeScreen;
  
  if (screen === 1) {
    return <ScreenComponent setScreen={setScreen} setAssessmentData={setAssessmentData} />;
  } else if (screen === 2) {
    return <ScreenComponent assessmentData={assessmentData} />;
  }
  
  return <ScreenComponent setScreen={setScreen} />;
};

// Main Modal Component
export default function AssessmentModal({ open, setOpen }) {
  const [screen, setScreen] = useState(0);
  const [assessmentData, setAssessmentData] = useState(null);

  const handleClose = () => {
    setOpen(false);
    setScreen(0);
    setAssessmentData(null);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="assessment-modal-title"
    >
      <Box sx={modalStyle}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        {renderScreen(screen, setScreen, assessmentData, setAssessmentData)}
      </Box>
    </Modal>
  );
}

// Screen One Component
function WelComeScreen({ setScreen }) {
  return (
    <Box
      sx={{
        textAlign: "center",
      }}
    >
      <Typography
        id="assessment-modal-title"
        variant="h5"
        component="h2"
        sx={{
          fontWeight: "bold",
          mb: 4,
          textAlign: "center",
          color: "white",
          fontSize: { xs: "0.8em", sm: "1rem" },
          lineHeight: 1.4,
        }}
      >
        Answer the questions honestly (we are here to help, not judge👍)
      </Typography>

      <Button
        variant="contained"
        onClick={() => setScreen(1)}
        sx={{
          backgroundColor: "#000000",
          color: "white",
          py: 1,
          px: 4,
          borderRadius: "50px",
          textTransform: "none",
          fontSize: "18px",
          fontWeight: "bold",
          minWidth: 180,
          "&:hover": {
            backgroundColor: "#333333",
            boxShadow: 4,
          },
        }}
      >
        Go
      </Button>
    </Box>
  );
}
