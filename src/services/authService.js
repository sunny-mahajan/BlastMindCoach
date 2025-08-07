import api from "../utils/api";

const signIn = async (data) => {
  try {
    const response = await api.post("/api/mindcoach/auth/login", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const signUp = async (data) => {
  try {
    const response = await api.post("/api/mindcoach/auth/signup", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const AuthServices = {
  signIn,
  signUp,
};

export default AuthServices;
