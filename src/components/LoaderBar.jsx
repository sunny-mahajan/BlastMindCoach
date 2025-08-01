import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";

const LoaderBar = () => {
  const loading = useSelector((state) => state.loader.loading);

  return loading ? (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 2000 }}>
      <LinearProgress />
    </div>
  ) : null;
};

export default LoaderBar;