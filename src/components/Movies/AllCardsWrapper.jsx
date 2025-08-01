import React, { useRef } from "react";
import "./MoviesStyles.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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
        <img src="/images/icons/chevron-right.png" alt="Left Arrow" />
      </button>
      <div className="all-cards-wrapper-scroll" ref={scrollRef} {...restProps}>
        {children}
      </div>
      <button className="arrow-button right" onClick={() => scroll("right")}>
        <img src="/images/icons/chevron-right.png" alt="Right Arrow" />
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
}

export default AllCardsWrapper;
