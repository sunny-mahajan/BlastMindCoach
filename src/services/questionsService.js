import api from "../utils/api";

const fetchAssessmentQuestion = async () => {
  try {
    const response = await api.get("/api/mindcoach/assessment/question");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ToolServices = {
  fetchAssessmentQuestion,
};

export default ToolServices
