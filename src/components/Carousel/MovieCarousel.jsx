// import React, { useRef } from "react";
// import { Box, Typography } from "@mui/material";
// import { styled } from "@mui/system";
// import PlayArrowIcon from "@mui/icons-material/PlayArrow";
// import AddIcon from "@mui/icons-material/Add";
// import DownloadIcon from "@mui/icons-material/Download";

// const CarouselContainer = styled(Box)(({ theme }) => ({
//   display: "flex",
//   overflowX: "auto",
//   padding: theme.spacing(2),
//   scrollSnapType: "x mandatory",
//   gap: theme.spacing(2),
//   position: "relative",
//   "&::-webkit-scrollbar": {
//     display: "none",
//   },
// }));

// const ItemWrapper = styled(Box)(({ theme }) => ({
//   flex: "0 0 auto",
//   width: 150,
//   scrollSnapAlign: "start",
//   position: "relative",
//   transition: "transform 0.3s ease",
//   "&:hover": {
//     transform: "scale(1.25)",
//     zIndex: 10,
//   },
//   [theme.breakpoints.up("sm")]: {
//     width: 180,
//   },
//   [theme.breakpoints.up("md")]: {
//     width: 220,
//   },
// }));

// const ImageBox = styled(Box)({
//   width: "100%",
//   height: "100%",
//   borderRadius: 4,
//   overflow: "hidden",
//   position: "relative",
// });

// const OverlayControls = styled(Box)(({ theme }) => ({
//   position: "absolute",
//   bottom: 0,
//   width: "100%",
//   background: "rgba(0, 0, 0, 0.7)",
//   color: "white",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-around",
//   padding: theme.spacing(1),
//   visibility: "hidden",
//   [`${ItemWrapper}:hover &`]: {
//     visibility: "visible",
//   },
// }));

// const VideoPreview = styled("video")({
//   width: "100%",
//   height: "100%",
//   objectFit: "cover",
//   position: "absolute",
//   top: 0,
//   left: 0,
// });

// const MovieCarousel = ({ title = "Top Movies", data = [] }) => {
//   console.log("data: ", data);
//   const carouselRef = useRef(null);

//   const Favourites = data.map((item) =>
//     item.data.filter((item) => item.genre.toLowerCase() === "mathematics")
//   );
//   console.log("Favourites: ", Favourites);

//   return (
//     <Box sx={{ mt: 4 }}>
//       <Typography variant="h5" color="white" mb={2} ml={2}>
//         {title}
//       </Typography>
//       <CarouselContainer ref={carouselRef}>
//         {Favourites[0].map((item, index) => (
//           <ItemWrapper
//             key={index}
//             sx={{
//               marginLeft: index === 0 ? 2 : 0,
//               marginRight: index === data.length - 1 ? 2 : 0,
//             }}
//           >
//             <ImageBox>
//               <img
//                 src={`/images/${"courses"}/${item.genre}/${
//                   item.slug
//                 }/small.png`}
//                 alt={"image"}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />

//               <OverlayControls>
//                 <PlayArrowIcon />
//                 <AddIcon />
//                 <DownloadIcon />
//               </OverlayControls>
//             </ImageBox>
//           </ItemWrapper>
//         ))}
//       </CarouselContainer>
//     </Box>
//   );
// };

// export default MovieCarousel;

import React, { useRef } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  IconButton,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import CarouselItem from "./CarouselItem";
const CarouselWrapper = styled(Box)({
  position: "relative",
});

const CarouselContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  padding: theme.spacing(2),
  gap: theme.spacing(3),
  scrollSnapType: "x mandatory",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const IndexLabel = styled(Typography)(({ theme }) => ({
  fontSize: 130,
  fontWeight: 900,
  color: "rgba(255,255,255,0.08)",
  marginRight: -40,
  marginLeft: 10,
  zIndex: 1,
  [theme.breakpoints.down("sm")]: {
    fontSize: 60,
    marginRight: -20,
  },
}));

const ItemWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flex: "0 0 auto",
  scrollSnapAlign: "start",
  transition: "transform 0.3s ease-in-out",
}));

const ImageBox = styled(Box)({
  width: 160,
  height: "auto",
  borderRadius: 8,
  overflow: "hidden",
  position: "relative",
  boxShadow: "0 6px 10px rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.1)",
    zIndex: 10,
  },
});

const OverlayControls = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  width: "100%",
  background: "rgba(0, 0, 0, 0.7)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  padding: theme.spacing(1),
  opacity: 0,
  transition: "opacity 0.3s ease",
  [`${ItemWrapper}:hover &`]: {
    opacity: 1,
  },
}));

const TagLabel = styled(Chip)(({ theme }) => ({
  position: "absolute",
  bottom: 10,
  left: 10,
  zIndex: 5,
  fontWeight: 600,
  fontSize: 12,
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 20,
  backgroundColor: "rgba(0,0,0,0.5)",
  color: "white",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
}));

const MovieCarousel = ({
  title = "Top Items",
  data = [],
  hasIndex = false,
}) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const carouselRef = useRef(null);

  const Favourites = data.map((item) =>
    item.data.filter((d) => d.genre.toLowerCase() === "mathematics")
  );

  const scroll = (direction) => {
    const container = carouselRef.current;
    if (!container) return;
    const scrollAmount = isMobile ? 200 : 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" color="white" mb={2} ml={2}>
        {title}
      </Typography>
      <CarouselWrapper>
        <NavButton onClick={() => scroll("left")} sx={{ left: 0 }}>
          <ChevronLeftIcon />
        </NavButton>
        <CarouselContainer ref={carouselRef}>
          {Favourites[0]?.map((item, index) => (
            <ItemWrapper key={index}>
              {hasIndex && <IndexLabel>{index + 1}</IndexLabel>}
              <CarouselItem
                item={item}
                icon={`/images/courses/${item.genre}/${item.slug}/small.png`}
                report={item.report}
              />
            </ItemWrapper>
          ))}
        </CarouselContainer>

        <NavButton onClick={() => scroll("right")} sx={{ right: 0 }}>
          <ChevronRightIcon />
        </NavButton>
      </CarouselWrapper>
    </Box>
  );
};

export default MovieCarousel;
