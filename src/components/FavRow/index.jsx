import React, { useRef } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CardWrapper from "../Movies/CardWrapper";
import CardImage from "../Movies/CardImage";

const FavoritesRow = ({ slideItem, category }) => {
  console.log("slideItem: ", slideItem);
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
    <div className="slide-container">
      <div className="all-slides-wrapper">
        <h6 className="title">Favorites</h6>
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
          <div className="all-cards-wrapper-scroll" ref={scrollRef}>
            {slideItem.map((cardItem) => (
              <CardWrapper
                key={cardItem.id}
                item={cardItem}
                category={category}
                itemIndex={
                  slideItem.title === "Favorites" && category === "courses"
                    ? slideItem.data.indexOf(cardItem) + 1
                    : null
                }
              >
                <CardImage
                  src={`../images/${category}/${cardItem.genre}/${cardItem.slug}/small.png`}
                />
              </CardWrapper>
            ))}
          </div>
          <button
            className="arrow-button right"
            onClick={() => scroll("right")}
          >
            <ArrowForwardIosIcon
              style={{
                color: "black",
                fontSize: "2rem",
                cursor: "pointer",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoritesRow;
