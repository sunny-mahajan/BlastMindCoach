import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import AssessmentModal from "../../components/BrainState";
import ToolServices from "../../services/questionsService";
import { SampleQuestions } from "../../constants/brainStateQuestions";

const BrainState = () => {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await ToolServices?.fetchAssessmentQuestion();
        setQuestions(SampleQuestions || data);
      } catch {
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };
    getQuestions();
  }, []);

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
        py: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          p: { xs: 2, sm: 3 },
          mb: 3,
          maxWidth: 1170,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          id="assessment-modal-title"
          variant="h4"
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
        {error && <Typography color="error">{error}</Typography>}
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
            width: { xs: "100%", sm: "90%", md: "70%", lg: "60%" },
            maxWidth: 600,
            mx: "auto",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
          onClick={() => setOpen(true)}
          disabled={loading || !!error || questions.length === 0}
        >
          {loading ? <CircularProgress size={20} /> : "👉 Take the assessment"}
        </Button>
      </Box>
      <AssessmentModal open={open} setOpen={setOpen} questions={questions} />
    </Container>
  );
};

export default BrainState;
