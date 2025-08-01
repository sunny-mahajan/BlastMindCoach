import React, { useState } from "react";
import styled from "styled-components";
import PlayerVideo from "../Movies/PlayerVideo";
import PlayerOverlay from "../Movies/PlayerOverlay";

const SubSectionCard = styled.div`
  border-radius: 8px;
  color: white;
  text-align: center;
  min-width: 200px; /* Fixed width for cards */
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0; /* Prevent cards from shrinking */
  position: relative; /* For positioning details on hover */
  overflow: hidden; /* Hide overflowing content */
  height: 270px; /* Fixed height to accommodate content */
  justify-content: center; /* Center content vertically */

  &:hover {
    transform: scale(1.25) translateY(-5px);
    z-index: 1;
  }
`;

const SubSectionImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 10px;
  transition: transform 0.3s ease-in-out;
`;

function TeaPlanSubSectionCard({ item }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <SubSectionCard
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <SubSectionImage src={item.image} alt={item.title} />
      {showDetails && item.type !== "tool" && (
        <PlayerOverlay>
          <PlayerVideo
            src="../videos/video.mp4"
            type="video/mp4"
            autoPlay
            muted
            controls={false}
          />
        </PlayerOverlay>
      )}
    </SubSectionCard>
  );
}

export default TeaPlanSubSectionCard;