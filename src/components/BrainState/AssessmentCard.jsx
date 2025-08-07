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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedValue, setSelectedValue] = useState(null);

  const currentQuestion = questions?.[currentQuestionIndex];
  const currentQuestionId = currentQuestion?._id;

  const handleNext = () => {
    if (currentQuestionIndex < questions?.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);

      const nextQuestionId = questions[nextIndex]?._id;
      setSelectedValue(answers[nextQuestionId] || null);

      if (onQuestionChange) {
        onQuestionChange(nextIndex);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);

      const prevQuestionId = questions[prevIndex]?._id;
      setSelectedValue(answers[prevQuestionId] || null);

      if (onQuestionChange) {
        onQuestionChange(prevIndex);
      }
    }
  };

  const handleScaleSelect = (value) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestionId]: value,
    };

    setSelectedValue(value);
    setAnswers(updatedAnswers);

    if (currentQuestionIndex === questions?.length - 1) {
      const questionsWithIds = questions?.map((q) => ({
        _id: q._id,
        question: q.question,
      }));

      setAssessmentData({
        questions: questionsWithIds,
        answers: updatedAnswers,
        currentQuestion: currentQuestionIndex,
      });

      setScreen(2);
    } else {
      handleNext();
    }
  };

  return (
    <GradientContainer>
      {/* Progress Dots */}
      <ProgressDots>
        {questions?.map((q, index) => (
          <ProgressDot
            key={q._id}
            completed={index < currentQuestionIndex}
            active={index === currentQuestionIndex}
          />
        ))}
      </ProgressDots>

      {/* Question Display */}
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
        {currentQuestionIndex + 1}. {currentQuestion?.question}
      </Typography>

      {/* Scale Buttons */}
      <ScaleContainer elevation={3}>
        <Box sx={{ display: "flex", gap: 1, position: "relative" }}>
          {Array.from({
            length: currentQuestion?.typeData?.rateLength || 0,
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
                  {selectedValue === 1 ? "Never" : "Always"}
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

      {/* Navigation Buttons */}
      <NavigationContainer>
        <Button
          variant="contained"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
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
