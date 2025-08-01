import { Routes, Route } from "react-router-dom";
import { authRouter, userRouter } from "./route.config";
import ProtectedRoute from "./protectedRoute";
import React from "react";

const Router = () => {
  return (
    <Routes>
      {authRouter.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={React.createElement(route.component)}
        />
      ))}
      {userRouter.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <ProtectedRoute>
              {React.createElement(route.component)}
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
};

export default Router;
