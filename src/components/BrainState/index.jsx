import React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export default function AssessmentModal({ open, setOpen }) {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Assessment
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="assessment-modal-title"
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            id="assessment-modal-title"
            variant="h5"
            component="h2"
            sx={{
              fontWeight: "bold",
              mb: 3,
              textAlign: "center",
              color: "#333",
            }}
          >
            The Human-AI Readiness Brain State Assessment
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                backgroundColor: "#f44336",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
                flexShrink: 0,
              }}
            >
              <Typography
                sx={{ color: "white", fontSize: "14px", fontWeight: "bold" }}
              >
                🎯
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              YOUR GOAL: Get your Brain State score...
            </Typography>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              py: 1.5,
              borderRadius: 6,
              textTransform: "none",
              fontSize: "16px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            👉 Take the assessment
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
