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
import CardFeatureWrapper from "../components/Movies/CardFeatureWrapper";
import CardFeatureClose from "../components/Movies/CardFeatureClose";
import PlayerVideo from "../components/Movies/PlayerVideo";
import PlayerOverlay from "../components/Movies/PlayerOverlay";
import FooterCompound from "../compounds/FooterCompound";

function BrowsePage() {
  let { series } = useContent("series");
  series = [
    {
      title: "Documentaries",
      data: series.filter((item) => item.genre === "documentaries"),
    },
    {
      title: "Comedies",
      data: series.filter((item) => item.genre === "comedies"),
    },
    {
      title: "Children",
      data: series.filter((item) => item.genre === "children"),
    },
    { title: "Crime", data: series.filter((item) => item.genre === "crime") },
    {
      title: "Feel-Good",
      data: series.filter((item) => item.genre === "feel-good"),
    },
  ];

  let { films } = useContent("films");
  films = [
    { title: "Drama", data: films.filter((item) => item.genre === "drama") },
    {
      title: "Thriller",
      data: films.filter((item) => item.genre === "thriller"),
    },
    {
      title: "Children",
      data: films.filter((item) => item.genre === "children"),
    },
    {
      title: "Suspense",
      data: films.filter((item) => item.genre === "suspense"),
    },
    {
      title: "Romance",
      data: films.filter((item) => item.genre === "romance"),
    },
  ];

  const [category, setCategory] = useState("films");
  const currentCategory = category === "films" ? films : series;
  const [showCardFeature, setShowCardFeature] = useState(false);
  const [activeItem, setActiveItem] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  return (
    <>
      <HeaderWrapper className="header-wrapper-browse">
        <NavBar className="navbar-browse">
          <p className="navbar-brand-text">
            BlastMindCoach
          </p>
          <div className="navbar-links-wrapper">
            <HeaderLink
              className={
                category === "films" ? "header-link-bold" : "header-link"
              }
              onClick={() => setCategory("films")}
            >
              Films
            </HeaderLink>
            <HeaderLink
              className={
                category === "series" ? "header-link-bold" : "header-link"
              }
              onClick={() => setCategory("series")}
            >
              Series
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
            <div className={`burger-menu-overlay ${showBurgerMenu ? 'open' : ''}`}>
              <div className="burger-menu-content">
                <img
                  src="./images/icons/close-slim.png"
                  alt="Close menu"
                  className="burger-menu-close"
                  onClick={() => setShowBurgerMenu(false)}
                />
                <HeaderLink
                  className={
                    category === "films" ? "header-link-bold" : "header-link"
                  }
                  onClick={() => {
                    setCategory("films");
                    setShowBurgerMenu(false);
                  }}
                >
                  Films
                </HeaderLink>
                <HeaderLink
                  className={
                    category === "series" ? "header-link-bold" : "header-link"
                  }
                  onClick={() => {
                    setCategory("series");
                    setShowBurgerMenu(false);
                  }}
                >
                  Series
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
            Master Math, Science, English, and more with our interactive learning platform.
            Get personalized lessons, real-time feedback, and smart progress tracking.
            Learn at your own pace and build confidence every step of the way.
          </FeatureSubTitle>
          <PlayButton onClick={() => setShowPlayer(true)}>Play</PlayButton>
          {showPlayer ? (
            <PlayerOverlay onClick={() => setShowPlayer(false)}>
              <PlayerVideo src="./videos/video.mp4" type="video/mp4" />
            </PlayerOverlay>
          ) : null}
        </FeatureWrapper>
      </HeaderWrapper>

      <AllSlidesWrapper style={{ width: "100%", background: "black" }}>
        {currentCategory.map((slideItem) => (
          <SlideWrapper
            key={`${category}-${slideItem.title.toLowerCase()}`}
            style={{ width: "100%" }}
          >
            <SlideTitle>{slideItem.title}</SlideTitle>

            <AllCardsWrapper>
              {slideItem.data.map((cardItem) => (
                <CardWrapper key={cardItem.docId}>
                  <CardImage
                    onClick={() => {
                      setShowCardFeature(true);
                      setActiveItem(cardItem);
                    }}
                    src={`../images/${category}/${cardItem.genre}/${cardItem.slug}/small.jpg`}
                  />
                </CardWrapper>
              ))}
            </AllCardsWrapper>
            {showCardFeature &&
              slideItem.title.toLowerCase() === activeItem.genre ? (
              <CardFeatureWrapper
                style={{
                  backgroundImage: `url(../images/${category}/${activeItem.genre}/${activeItem.slug}/large.jpg)`,
                }}
              >
                <CardTitle>{activeItem.title}</CardTitle>
                <CardDescription>{activeItem.description}</CardDescription>
                <CardFeatureClose onClick={() => setShowCardFeature(false)} />
                <PlayButton onClick={() => setShowPlayer(true)}>
                  Play
                </PlayButton>
                {showPlayer ? (
                  <PlayerOverlay onClick={() => setShowPlayer(false)}>
                    <PlayerVideo src="../videos/video.mp4" type="video/mp4" />
                  </PlayerOverlay>
                ) : null}
              </CardFeatureWrapper>
            ) : null}
          </SlideWrapper>
        ))}
      </AllSlidesWrapper>
      <FooterCompound />
    </>
  );
}

export default BrowsePage;
