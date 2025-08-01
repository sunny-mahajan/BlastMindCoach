import React, { useRef } from "react";
import "./MoviesStyles.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
function AllCardsWrapper({ children, ...restProps }) {
  const scrollRef = useRef(null);
  const scrollAmount = 800; // Adjust this value as needed

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="all-cards-container">
      <button className="arrow-button left" onClick={() => scroll("left")}>
        <ArrowBackIosIcon
          style={{
            color: "black",
            fontSize: "2rem",
            cursor: "pointer",
          }}
        />
      </button>
      <div className="all-cards-wrapper-scroll" ref={scrollRef} {...restProps}>
        {children}
      </div>
      <button className="arrow-button right" onClick={() => scroll("right")}>
        <ArrowForwardIosIcon
          style={{
            color: "black",
            fontSize: "2rem",
            cursor: "pointer",
          }}
        />
      </button>
    </div>
  );
}

export default AllCardsWrapper;
