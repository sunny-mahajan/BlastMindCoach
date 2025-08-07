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

const saveAssessmentAnswer = async (data) => {
  try {
    const response = await api.post("/api/mindcoach/tool/record", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ToolServices = {
  fetchAssessmentQuestion,
  saveAssessmentAnswer,
};

export default ToolServices;
