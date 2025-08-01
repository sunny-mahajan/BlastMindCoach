import React, { useRef } from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const SubSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 4em;
  border-radius: 8px;
  margin-top: 20px;
  align-items: center;
`;

const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const CarouselScroll = styled.div`
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  gap: 20px; /* Space between cards */
  padding: 10px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 2rem;
  z-index: 10;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 10px;
  &.left {
    left: 0;
  }
  &.right {
    right: 0;
  }
`;

const SubSectionCard = styled.div`
  border-radius: 8px;
  padding: 15px;
  color: white;
  text-align: center;
  min-width: 200px; /* Fixed width for cards */
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0; /* Prevent cards from shrinking */

  &:hover {
    transform: translateY(-5px);
  }
`;

const SubSectionImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const SubSectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const SubSectionDescription = styled.p`
  font-size: 0.9rem;
  color: #bbb;
`;

function TeaPlanSubSections({ subSections, parentItem }) {
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

  const allSubSections = subSections.flat();
  const carouselItems = parentItem
    ? [parentItem, ...allSubSections]
    : allSubSections;

  return (
    <SubSectionContainer>
      <CarouselContainer>
        <ArrowButton className="left" onClick={() => scroll("left")}>
          <ArrowBackIosIcon style={{ color: "black", fontSize: "3rem" }} />
        </ArrowButton>
        <CarouselScroll ref={scrollRef}>
          {carouselItems.map((item) => (
            <SubSectionCard key={item.id}>
              <SubSectionImage src={item.image} alt={item.title} />
            </SubSectionCard>
          ))}
        </CarouselScroll>
        <ArrowButton className="right" onClick={() => scroll("right")}>
          <ArrowForwardIosIcon style={{ color: "black", fontSize: "3rem" }} />
        </ArrowButton>
      </CarouselContainer>
    </SubSectionContainer>
  );
}

export default TeaPlanSubSections;
