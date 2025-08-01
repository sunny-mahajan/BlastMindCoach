import React from "react";
import "./MoviesStyles.css";

function CardImage({ itemIndex, ...restProps }) {
  return (
    <>
      {itemIndex && <span className="card-number">{itemIndex}</span>}
      <img className="card-image" alt="movie" {...restProps} />
    </>
  );
}

export default CardImage;
