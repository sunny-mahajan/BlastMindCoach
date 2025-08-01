import React, { useState } from "react";
import useContent from "../../custom-hooks/useContent";
import HeaderWrapper from "../../components/Header/HeaderWrapper";
import NavBar from "../../components/Header/NavBar";
import FeatureWrapper from "../../components/Header/FeatureWrapper";
import FeatureTitle from "../../components/Header/FeatureTitle";
import FeatureSubTitle from "../../components/Header/FeatureSubTitle";
import PlayButton from "../../components/Header/PlayButton";
import HeaderLink from "../../components/Header/HeaderLink";
import AllSlidesWrapper from "../../components/Movies/AllSlidesWrapper";
import SlideWrapper from "../../components/Movies/SlideWrapper";
import SlideTitle from "../../components/Movies/SlideTitle";
import AllCardsWrapper from "../../components/Movies/AllCardsWrapper";
import CardWrapper from "../../components/Movies/CardWrapper";
import CardImage from "../../components/Movies/CardImage";
import PlayerVideo from "../../components/Movies/PlayerVideo";
import PlayerOverlay from "../../components/Movies/PlayerOverlay";
import FooterCompound from "../../compounds/FooterCompound";
import TeaPlanSubSections from "../../components/TeaPlan/TeaPlanSubSections";
import { useNavigate } from "react-router";

function BrowsePage() {
  const navigate = useNavigate();
  let { tutorials } = useContent("tutorials");
  tutorials = [
    {
      title: "Favorites",
      data: tutorials.filter((item) => item.genre === "mathematics").sort((a, b) => a.slug.localeCompare(b.slug)),
    },
    {
      title: "AI-Edge Habit Mechanic ® Organizational Transform Program",
      data: tutorials.filter((item) => item.genre === "science").sort((a, b) => a.slug.localeCompare(b.slug)),
    },
  ];

  let { courses } = useContent("courses");
  courses = [
    {
      title: "Favorites",
      data: courses.filter((item) => item.genre === "mathematics").sort((a, b) => a.slug.localeCompare(b.slug)),
    },
    {
      title: "AI-Edge Habit Mechanic ® Organizational Transform Program",
      data: courses.filter((item) => item.genre === "science").sort((a, b) => a.slug.localeCompare(b.slug)),
    },
  ];

  const [category, setCategory] = useState("courses");
  const currentCategory = category === "courses" ? courses : tutorials;
  const [showPlayer, setShowPlayer] = useState(false);
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);
  const [showTeaPlanSection, setShowTeaPlanSection] = useState(false);

  const handleTeaPlanClick = (itemSlug) => {
    if (itemSlug === "tea-plan") {
      setShowTeaPlanSection(!showTeaPlanSection);
    } else if (itemSlug === "brain-state") {
      navigate("/brain-state-assessment");
    } else {
      setShowTeaPlanSection(false);
    }
  };

  const teaPlanItem = courses
    .flatMap((course) => course.data)
    .find((item) => item.slug === "tea-plan");

  return (
    <>
      <HeaderWrapper className="header-wrapper-browse">
        <NavBar className="navbar-browse">
          <p className="navbar-brand-text">Blast Mind Coach</p>
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
                  onCardClick={handleTeaPlanClick}
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
            </AllCardsWrapper>
          </SlideWrapper>
        ))}
      </AllSlidesWrapper>
      {showTeaPlanSection && teaPlanItem && teaPlanItem.subSection && (
        <TeaPlanSubSections
          subSections={teaPlanItem.subSection}
          parentItem={teaPlanItem}
        />
      )}
      <FooterCompound />
    </>
  );
}

export default BrowsePage;
