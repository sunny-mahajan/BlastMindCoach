import React from "react";
import { LoadingProvider } from "./context/LoadingContext";
import LoaderBar from "./components/LoaderBar";
import Router from "./routes/index";

function App() {
  return (
    <LoadingProvider>
      <LoaderBar />
      <Router />
    </LoadingProvider>
  );
}

export default App;
