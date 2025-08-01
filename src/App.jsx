import React from "react";
import { LoadingProvider } from "./context/LoadingContext";
import LoaderBar from "./components/LoaderBar";
import Router from "./routes/index";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <LoadingProvider>
      <LoaderBar />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
