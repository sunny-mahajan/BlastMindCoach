import React, { useState } from "react";
import "./MoviesStyles.css";
import CardTitle from "./CardTitle";
import CardDescription from "./CardDescription";
import PlayerVideo from "./PlayerVideo";
import PlayerOverlay from "./PlayerOverlay";
import CardImage from "./CardImage"; // Import CardImage

function CardWrapper({ item, category, ...restProps }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className="card-wrapper"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      {...restProps}
    >
      {/* CardImage is always visible */}
      <CardImage
        src={`/images/${category}/${item.genre}/${item.slug}/small.png`}
      />

      {showDetails && (
        <div className="card-details-hover">
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
          {/* Remove PlayButton if not needed */}
          <PlayerOverlay onClick={() => setShowDetails(false)}>
            <PlayerVideo
              src="../videos/video.mp4"
              type="video/mp4"
              autoPlay
              muted // Optional: prevents autoplay issues in browsers
              controls={false} // Optional: hide controls if you want
            />
          </PlayerOverlay>
        </div>
      )}
    </div>
  );
}

export default CardWrapper;
