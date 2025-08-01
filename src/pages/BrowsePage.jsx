import React, { useState } from "react";
import useContent from "../custom-hooks/useContent";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import NavBar from "../components/Header/NavBar";
import FeatureWrapper from "../components/Header/FeatureWrapper";
import FeatureTitle from "../components/Header/FeatureTitle";
import FeatureSubTitle from "../components/Header/FeatureSubTitle";
import PlayButton from "../components/Header/PlayButton";
import HeaderLink from "../components/Header/HeaderLink";
import AllSlidesWrapper from "../components/Movies/AllSlidesWrapper";
import SlideWrapper from "../components/Movies/SlideWrapper";
import SlideTitle from "../components/Movies/SlideTitle";
import AllCardsWrapper from "../components/Movies/AllCardsWrapper";
import CardWrapper from "../components/Movies/CardWrapper";
import CardImage from "../components/Movies/CardImage";
import CardTitle from "../components/Movies/CardTitle";
import CardDescription from "../components/Movies/CardDescription";
import PlayerVideo from "../components/Movies/PlayerVideo";
import PlayerOverlay from "../components/Movies/PlayerOverlay";
import FooterCompound from "../compounds/FooterCompound";

function BrowsePage() {
  let { tutorials } = useContent("tutorials");
  tutorials = [
    {
      title: "Mathematics",
      data: tutorials.filter((item) => item.genre === "mathematics"),
    },
    {
      title: "Science",
      data: tutorials.filter((item) => item.genre === "science"),
    },
  ];

  let { courses } = useContent("courses");
  courses = [
    {
      title: "Mathematics",
      data: courses.filter((item) => item.genre === "mathematics"),
    },
    {
      title: "Science",
      data: courses.filter((item) => item.genre === "science"),
    },
  ];

  const [category, setCategory] = useState("courses");
  const currentCategory = category === "courses" ? courses : tutorials;
  const [showPlayer, setShowPlayer] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  return (
    <>
      <HeaderWrapper className="header-wrapper-browse">
        <NavBar className="navbar-browse">
          <p className="navbar-brand-text">BlastMindCoach</p>
          <div className="navbar-links-wrapper">
            <HeaderLink
              className={
                category === "courses" ? "header-link-bold" : "header-link"
              }
              onClick={() => setCategory("courses")}
            >
              Courses
            </HeaderLink>
            <HeaderLink
              className={
                category === "tutorials" ? "header-link-bold" : "header-link"
              }
              onClick={() => setCategory("tutorials")}
            >
              Tutorials
            </HeaderLink>
          </div>

          <div
            className="burger-icon"
            onClick={() => setShowBurgerMenu(!showBurgerMenu)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          {showBurgerMenu && (
            <div
              className={`burger-menu-overlay ${showBurgerMenu ? "open" : ""}`}
            >
              <div className="burger-menu-content">
                <img
                  src="./images/icons/close-slim.png"
                  alt="Close menu"
                  className="burger-menu-close"
                  onClick={() => setShowBurgerMenu(false)}
                />
                <HeaderLink
                  className={
                    category === "courses" ? "header-link-bold" : "header-link"
                  }
                  onClick={() => {
                    setCategory("courses");
                    setShowBurgerMenu(false);
                  }}
                >
                  courses
                </HeaderLink>
                <HeaderLink
                  className={
                    category === "tutorials"
                      ? "header-link-bold"
                      : "header-link"
                  }
                  onClick={() => {
                    setCategory("tutorials");
                    setShowBurgerMenu(false);
                  }}
                >
                  tutorials
                </HeaderLink>
              </div>
            </div>
          )}
        </NavBar>
        <FeatureWrapper>
          <FeatureTitle className="feature-title-browse">
            Unlock Learning Like Never Before
          </FeatureTitle>
          <FeatureSubTitle className="feature-subtitle-browse">
            Master Math, Science, English, and more with our interactive
            learning platform. Get personalized lessons, real-time feedback, and
            smart progress tracking. Learn at your own pace and build confidence
            every step of the way.
          </FeatureSubTitle>
          <PlayButton onClick={() => setShowPlayer(true)}>Play</PlayButton>
          {showPlayer ? (
            <PlayerOverlay onClick={() => setShowPlayer(false)}>
              <PlayerVideo src="./videos/video.mp4" type="video/mp4" />
            </PlayerOverlay>
          ) : null}
        </FeatureWrapper>
      </HeaderWrapper>

      <AllSlidesWrapper style={{ width: "100%" }}>
        {currentCategory.map((slideItem) => (
          <SlideWrapper
            key={`${category}-${slideItem.title.toLowerCase()}`}
            style={{ width: "100%" }}
          >
            <SlideTitle>{slideItem.title}</SlideTitle>

            <AllCardsWrapper>
              {slideItem.data.map((cardItem) => (
                <CardWrapper
                  key={cardItem.id}
                  item={cardItem}
                  category={category}
                >
                  <CardImage
                    src={`../images/${category}/${cardItem.genre}/${cardItem.slug}/small.jpg`}
                  />
                </CardWrapper>
              ))}
            </AllCardsWrapper>
          </SlideWrapper>
        ))}
      </AllSlidesWrapper>
      <FooterCompound />
    </>
  );
}

export default BrowsePage;
