import React, { useState } from "react";
import "./MoviesStyles.css";
import CardTitle from "./CardTitle";
import CardDescription from "./CardDescription";
import PlayButton from "../Header/PlayButton";
import PlayerVideo from "./PlayerVideo";
import PlayerOverlay from "./PlayerOverlay";
import CardImage from "./CardImage"; // Import CardImage

function CardWrapper({ children, item, category, ...restProps }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div
      className="card-wrapper"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      {...restProps}
    >
      {/* CardImage is always visible */}
      <CardImage src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`} />

      {showDetails && (
        <div className="card-details-hover">
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
          <PlayButton onClick={() => setShowPlayer(true)}>Play</PlayButton>
          {showPlayer ? (
            <PlayerOverlay onClick={() => setShowPlayer(false)}>
              <PlayerVideo src="../videos/video.mp4" type="video/mp4" />
            </PlayerOverlay>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default CardWrapper;
