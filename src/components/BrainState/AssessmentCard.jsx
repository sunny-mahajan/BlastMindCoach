import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const GradientContainer = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
}));

const ProgressDots = styled(Box)({
  display: "flex",
  gap: "8px",
  marginBottom: "20px",
});

const ProgressDot = styled(Box)(({ active, completed }) => ({
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: completed
    ? "#fff"
    : active
    ? "#fff"
    : "rgba(255,255,255,0.4)",
  transition: "all 0.3s ease",
}));

const ScaleContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "25px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: theme.spacing(3, 0),
  width: "90%",
}));

const ScaleButton = styled(Button)(({ selected, value }) => {
  const getColor = (val) => {
    const colors = [
      "#d32f2f",
      "#e53935",
      "#f44336",
      "#ff5252",
      "#ff7043",
      "#ff8a65",
      "#ffab40",
      "#42a5f5",
      "#1976d2",
      "#0d47a1",
    ];
    return colors[val - 1];
  };

  return {
    minWidth: "45px",
    height: "45px",
    borderRadius: "50%",
    backgroundColor: getColor(value),
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    "&:hover": {
      backgroundColor: getColor(value),
      transform: "scale(1.1)",
    },
    transform: selected ? "scale(1.2)" : "scale(1)",
    transition: "all 0.2s ease",
    boxShadow: selected
      ? "0 4px 20px rgba(0,0,0,0.3)"
      : "0 2px 10px rgba(0,0,0,0.2)",
  };
});

const NavigationContainer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "90%",
  marginTop: "20px",
});

const questions = [
  "😟 I find myself responding to urgent issues instead of having a plan (or sticking to my plan).",
  "🧠 I get interrupted (by others, emails/phone, and my own self-doubt/negative self-talk) and it takes me longer to complete my work.",
  "⚡ I sleep poorly and it takes longer to complete my work to a high standard.",
  "📱 I waste time doubting my decisions, second-guessing myself, and beating myself up.",
  "🤝 My mind feels foggy and it slows down my work",
  "😴 I put off important tasks even though I know they need doing.",
  "🎯 I feel overwhelmed and I make mistakes that take time to fix",
  "💭 I find myself scrolling social media when I know it is not a good use of my time.",
  "⏰ I sleep poorly and it makes it harder to spot and prevent mistakes in my work",
  "🤝 My mind jumps between tasks instead of focusing on one thing.",
  "🔄 I get distracted (including by my own self-doubt/negative self-talk).",
  "🎪 I feel like I could achieve more if I felt more confident and focused. ",
  "😰 I waste time because I’m not thinking clearly.",
  "🤝 My diet choices leave me feeling sluggish and it takes me longer to complete my work.",
  "🤝 Lack of regular exercise (10,000+ steps, elevated heart rate) reduces my mental energy and focus. ",
];

function AssessmentCard({ setScreen, setAssessmentData, onQuestionChange }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      setSelectedValue(answers[nextQuestion] || null);
      if (onQuestionChange) {
        onQuestionChange(nextQuestion);
      }
    } else if (currentQuestion === questions.length - 1) {
      setAssessmentData({
        questions,
        answers,
        currentQuestion,
      });
      setScreen(2);
    }
  };

  const handleScaleSelect = (value) => {
    setSelectedValue(value);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: value,
    }));
    handleNext();
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      const prevQuestion = currentQuestion - 1;
      setCurrentQuestion(prevQuestion);
      setSelectedValue(answers[prevQuestion] || null);
      if (onQuestionChange) {
        onQuestionChange(prevQuestion);
      }
    }
  };

  return (
    <GradientContainer>
      {/* Progress Dots */}
      <ProgressDots>
        {questions.map((_, index) => (
          <ProgressDot
            key={index}
            completed={index < currentQuestion}
            active={index === currentQuestion}
          />
        ))}
      </ProgressDots>

      {/* Question Text */}
      <Typography
        variant="h6"
        sx={{
          color: "white",
          textAlign: "center",
          fontWeight: 500,
          marginBottom: 4,
          maxWidth: "600px",
          lineHeight: 1.4,
        }}
      >
        {currentQuestion + 1}.{questions[currentQuestion]}
      </Typography>

      <ScaleContainer elevation={3}>
        <Box sx={{ display: "flex", gap: 1, position: "relative" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <>
              {(selectedValue === 1 || selectedValue === 10) && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontWeight: "bold",
                    fontSize: "12px",
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    zIndex: 5,
                  }}
                >
                  {selectedValue === 1 ? "Never" : " Always"}
                </Typography>
              )}
              <ScaleButton
                key={value}
                value={value}
                selected={selectedValue === value}
                onClick={() => handleScaleSelect(value)}
              >
                {value}
              </ScaleButton>
            </>
          ))}
        </Box>
      </ScaleContainer>

      <NavigationContainer>
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            borderRadius: "20px",
            textTransform: "none",
            padding: "8px 24px",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.3)",
            },
            "&:disabled": {
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
            },
          }}
        >
          Previous
        </Button>
      </NavigationContainer>
    </GradientContainer>
  );
}

export default AssessmentCard;
