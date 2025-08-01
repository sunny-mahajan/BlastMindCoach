import React from "react";
import "./MoviesStyles.css";

function SlideTitle({ children, ...restProps }) {
  return (
    <div className="slide-title" {...restProps}>
      <div className="title">{children}</div>
    </div>
  );
}

export default SlideTitle;
