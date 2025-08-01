import React from "react";
import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CheckCircle, Email, ShowChart } from "@mui/icons-material";

// Custom styled components
const GradientBackground = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxHeight: "90vh",
  overflow: "auto",
});

const HeaderSection = styled(Box)({
  textAlign: "center",
  color: "white",
});

const ResultsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
    margin: theme.spacing(0, 2),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    margin: theme.spacing(0, 1),
  },
}));

const QuestionItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  padding: theme.spacing(2, 0),
  borderBottom: "1px solid #e0e0e0",
  "&:last-child": {
    borderBottom: "none",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(1),
  },
}));

const QuestionText = styled(Typography)(({ theme }) => ({
  flex: 1,
  paddingRight: theme.spacing(2),
  fontSize: "14px",
  lineHeight: 1.5,
  [theme.breakpoints.down("sm")]: {
    paddingRight: 0,
    fontSize: "13px",
  },
}));

const ScoreBox = styled(Box)(({ score }) => {
  const getScoreColor = (score) => {
    if (score <= 3) return "#4caf50"; // Green
    if (score <= 6) return "#ff9800"; // Orange
    return "#f44336"; // Red
  };

  return {
    minWidth: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: getScoreColor(score),
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "18px",
    flexShrink: 0,
  };
});

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "25px",
  padding: theme.spacing(1.5, 4),
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "16px",
  margin: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1, 2),
    fontSize: "14px",
    margin: theme.spacing(0.5),
    width: "100%",
  },
}));

const assessmentResults = [
  {
    id: 1,
    emoji: "😟",
    text: "I find myself responding to urgent issues instead of having a plan (or sticking to my plan).",
    score: 7,
  },
  {
    id: 2,
    emoji: "🧠",
    text: "I get interrupted (by others, emails/phone, and my own self-doubt/negative self-talk) and it takes me longer to complete my work.",
    score: 8,
  },
  {
    id: 3,
    emoji: "😴",
    text: "I sleep poorly and it takes longer to complete my work to a high standard.",
    score: 6,
  },
  {
    id: 4,
    emoji: "😰",
    text: "I waste time doubting my decisions, second-guessing myself, and beating myself up.",
    score: 9,
  },
];

export default function AssessmentResultsScorecard({ assessmentData }) {
  console.log("assessmentData: ", assessmentData);
  const handleEmailResults = () => {
    // In real app, this would trigger email functionality
    console.log("Email results clicked");
  };

  const handleAnalyzeResults = () => {
    // In real app, this would navigate to analysis page
    console.log("Analyze results clicked");
  };

  return (
    <GradientBackground>
      {/* Header Section */}
      <HeaderSection>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <CheckCircle sx={{ fontSize: 32, mr: 1, color: "#4caf50" }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
            }}
          >
            Well done on completing the test!
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
              textAlign: "center",
              maxWidth: "600px",
            }}
          >
            <ShowChart sx={{ fontSize: 24, mr: 1, color: "#f44336" }} /> Now
            analyse your results (or email them to yourself from the bottom of
            the page)...
          </Typography>
        </Box>
      </HeaderSection>

      {/* Results Card */}
      <ResultsCard>
        {/* Title Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              color: "#1976d2",
              fontWeight: "bold",
              mb: 1,
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            1. Get your Brain State score (scroll down) 👇
          </Typography>
          <Divider sx={{ mt: 2, mb: 3 }} />
        </Box>
        <Box>
          {assessmentResults.map((item, index) => (
            <QuestionItem key={item.id}>
              <Box sx={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#666",
                    mr: 1,
                    minWidth: "20px",
                  }}
                >
                  {index + 1}.
                </Typography>
                <QuestionText>
                  <span style={{ fontSize: "16px", marginRight: "8px" }}>
                    {item.emoji}
                  </span>
                  {item.text}
                </QuestionText>
              </Box>
              <ScoreBox score={item.score}>{item.score}</ScoreBox>
            </QuestionItem>
          ))}
        </Box>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            mt: 4,
            pt: 3,
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <ActionButton
            variant="contained"
            color="primary"
            onClick={handleAnalyzeResults}
            sx={{ backgroundColor: "#1976d2" }}
          >
            📊 Analyze My Results
          </ActionButton>
          <ActionButton
            variant="outlined"
            color="primary"
            startIcon={<Email />}
            onClick={handleEmailResults}
          >
            Email Results to Myself
          </ActionButton>
        </Box>
      </ResultsCard>
    </GradientBackground>
  );
}
