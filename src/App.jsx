import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import BrowsePage from "./pages/BrowsePage";
import ProfilesPage from "./pages/ProfilesPage";
import * as ROUTES from "./constants/routes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<ProfilesPage />} />
        <Route path={ROUTES.SIGN_IN} element={<SigninPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignupPage />} />
        <Route path={ROUTES.BROWSE} element={<BrowsePage />} />
        <Route path={ROUTES.PROFILES} element={<ProfilesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
