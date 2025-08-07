import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
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

function AssessmentCard({
  setScreen,
  setAssessmentData,
  onQuestionChange,
  questions,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);

  const handleNext = () => {
    if (currentQuestion < questions?.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      setSelectedValue(answers[nextQuestion] || null);
      if (onQuestionChange) {
        onQuestionChange(nextQuestion);
      }
    }
  };

  const handleScaleSelect = (value) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion]: value,
    };

    setSelectedValue(value);
    setAnswers(updatedAnswers);

    if (currentQuestion === questions?.length - 1) {
      const onlyQuestions = questions?.map((i) => i.question);

      setAssessmentData({
        questions: onlyQuestions,
        answers: updatedAnswers,
        currentQuestion,
      });
      setScreen(2);
    } else {
      handleNext();
    }
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
      <ProgressDots>
        {questions?.map((_, index) => (
          <ProgressDot
            key={index}
            completed={index < currentQuestion}
            active={index === currentQuestion}
          />
        ))}
      </ProgressDots>

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
        {currentQuestion + 1}.{questions?.[currentQuestion]?.question}
      </Typography>

      <ScaleContainer elevation={3}>
        <Box sx={{ display: "flex", gap: 1, position: "relative" }}>
          {Array.from({
            length: questions?.[currentQuestion]?.typeData?.rateLength || 0,
          }).map((_, idx) => (
            <React.Fragment key={idx}>
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
                key={idx}
                value={idx + 1}
                selected={selectedValue === idx + 1}
                onClick={() => handleScaleSelect(idx + 1)}
              >
                {idx + 1}
              </ScaleButton>
            </React.Fragment>
          ))}
        </Box>
      </ScaleContainer>

      <NavigationContainer>
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            borderRadius: "20px",
            textTransform: "none",
            padding: "8px 24px",
            "&:hover": {
              backgroundColor: "#fff",
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
