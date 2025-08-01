import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../slices/AuthSlice";

export const useAuth = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return {
    isAuthenticated,
    user,
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
  };
};
