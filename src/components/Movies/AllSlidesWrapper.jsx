import React from "react";
import "./MoviesStyles.css";

function AllSlidesWrapper({ children, ...restProps }) {
  return (
    <div className="slide-container">
      <div className="all-slides-wrapper" {...restProps}>
        {children}
      </div>
    </div>
  );
}

export default AllSlidesWrapper;
