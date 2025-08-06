import React, { useState } from "react";
import { Box, Typography, Paper, Divider, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CheckCircle, Email, ShowChart } from "@mui/icons-material";


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

export default function AssessmentResultsScorecard({ assessmentData, totalMarks }) {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");

  const handleEmailResults = () => {
    console.log("Email results clicked");
  };

  const handleSubmitEmail = () => {
    console.log("Submit email:", { email, fullName });
    // Here you would typically send the email with the assessment results
  };

  return (
    <GradientBackground>
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

      <ResultsCard>
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
          {assessmentData?.questions
            .map((item, index) => (
              <QuestionItem key={index}>
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
                      {item}
                    </span>
                  </QuestionText>
                </Box>
                <ScoreBox score={assessmentData.answers?.[index]}>{assessmentData.answers?.[index]}</ScoreBox>
              </QuestionItem>
            ))}
        </Box>

        <Box sx={{ textAlign: "center", mb: 4, mt: 4 }}>
          <Box
            sx={{
              border: "2px solid #1976d2",
              borderRadius: "8px",
              padding: "16px",
              display: "inline-block",
              mb: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: "#1976d2",
                fontWeight: "bold",
                mb: 1,
              }}
            >
              Your score total:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "#000",
              }}
            >
              {Object.values(assessmentData?.answers || {}).reduce((sum, score) => sum + (score || 0), 0)}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 1,
            }}
          >
            📝 Write down your score
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#666",
              fontSize: "14px",
            }}
          >
            (insights based on our work with 20,000+ people over two decades)
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#ffebee",
            borderRadius: "12px",
            padding: "24px",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "center" }}>
            <Box
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#f44336",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Typography sx={{ color: "white", fontWeight: "bold" }}>!</Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#f44336",
                textAlign: "center",
              }}
            >
              SCORE: 91 to 150 😩
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              mb: 2,
              textAlign: "center",
            }}
          >
            Critical Areas Requiring Attention
          </Typography>

          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mr: 1, fontSize: "16px" }}>⏰</Typography>
              <Typography>
                Losing <strong style={{ backgroundColor: "#ffff00" }}>4 to 5 hours DAILY</strong> of Peak Cognitive Performance 🚀
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mr: 1, fontSize: "16px" }}>🧠</Typography>
              <Typography>
                Brain fog, self-doubt and procrastination significantly impact performance
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mr: 1, fontSize: "16px" }}>⛔</Typography>
              <Typography>
                Currently have 3-4 Destructive Habit Routines to reprogram
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mr: 1, fontSize: "16px" }}>🎯</Typography>
              <Typography>
                NEXT STEP: Go back to the main training to learn more about your Brain State score
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "#fff3e0",
            borderRadius: "12px",
            padding: "24px",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "center" }}>
            <Box
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#ff9800",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Typography sx={{ color: "white", fontWeight: "bold" }}>!</Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: "#ff9800",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              SCORE: 61 to 90 😐
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              mb: 2,
              textAlign: "center",
            }}
          >
            Areas Requiring Optimization
          </Typography>

          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mr: 1, fontSize: "16px" }}>😈</Typography>
              <Typography>
                Losing <strong style={{ backgroundColor: "#ffff00" }}>2 to 4 hours DAILY</strong> of Peak Cognitive Performance 🚀 to destructive 🧠 subconscious habits.
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mr: 1, fontSize: "16px" }}>⚡</Typography>
              <Typography>
                Some good habit programming but significant room for optimization.
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mr: 1, fontSize: "16px" }}>❗</Typography>
              <Typography>
                Currently have 2-3 Destructive Habit Routines to reprogram.
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mr: 1, fontSize: "16px" }}>✨</Typography>
              <Typography>
                NEXT STEP: Go back to the main training to learn more about your Brain State score.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: "#e8f5e8",
            borderRadius: "12px",
            padding: "24px",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, justifyContent: "center" }}>
            <Box
              sx={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#4caf50",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <Typography sx={{ color: "white", fontWeight: "bold" }}>✓</Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: "#4caf50",
                textAlign: "center",
              }}
            >
              SCORE: 15 to 60 🙂
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              mb: 2,
              textAlign: "center",
            }}
          >
            Good Foundation with Room for Growth
          </Typography>

          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mr: 1, fontSize: "16px" }}>😈</Typography>
              <Typography>
                Losing <strong style={{ backgroundColor: "#ffff00" }}>1 to 3 hours DAILY</strong> of Peak Cognitive Performance 🚀 to subconscious habits 🧠.
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mr: 1, fontSize: "16px" }}>✅</Typography>
              <Typography>
                Generally good programming with opportunity to optimize.
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mr: 1, fontSize: "16px" }}>✅</Typography>
              <Typography>
                Might have 1-2 Destructive Habit Routines to reprogram.
              </Typography>
            </Box>
            <Box component="li" sx={{ mb: 1, display: "flex", alignItems: "flex-start" }}>
              <Typography sx={{ mr: 1, fontSize: "16px" }}>✨</Typography>
              <Typography>
                NEXT STEP: Go back to the main training to learn more about your Brain State score.
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 4,
            pt: 3,
          }}
        >
          <Box
            sx={{
              height: "2px",
              backgroundColor: "#1976d2",
              width: "100%",
              mb: 3,
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#000",
                mb: 3,
                textAlign: "center",
              }}
            >
              Email me my results
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
                mb: 3,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                fullWidth
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderColor: "#1976d2",
                    "& fieldset": {
                      borderColor: "#1976d2",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#999",
                    opacity: 1,
                  },
                }}
              />
              <TextField
                fullWidth
                placeholder="Full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderColor: "#1976d2",
                    "& fieldset": {
                      borderColor: "#1976d2",
                    },
                    "&:hover fieldset": {
                      borderColor: "#1976d2",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#1976d2",
                    },
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#999",
                    opacity: 1,
                  },
                }}
              />
            </Box>

            <Button
              variant="outlined"
              onClick={handleSubmitEmail}
              sx={{
                borderRadius: "25px",
                padding: "12px 48px",
                borderColor: "#ff6b6b",
                backgroundColor: "#fff5f5",
                color: "#ff6b6b",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "16px",
                "&:hover": {
                  borderColor: "#ff6b6b",
                  backgroundColor: "#fff0f0",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </ResultsCard>
    </GradientBackground>
  );
}
