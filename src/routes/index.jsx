import { Routes, Route } from "react-router-dom";
import { authRouter, userRouter } from "./route.config";

const Router = () => {
  return (
    <Routes>
      {authRouter.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
      {userRouter.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};

export default Router;
