import api, { endpoint } from "../utils/api";

const fetchAssessmentQuestion = async () => {
  try {
    const response = await api.get(endpoint("/api/mindcoach/assessment/question"));
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const ToolServices = {
  fetchAssessmentQuestion,
};

export default ToolServices
