import React, { useState, useEffect } from "react";
import useContent from "../../custom-hooks/useContent";
import HeaderWrapper from "../../components/Header/HeaderWrapper";
import NavBar from "../../components/Header/NavBar";
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
import { Menu, MenuItem } from "@mui/material";
import "./browse.scss";
import FavoritesRow from "../../components/FavRow";

function BrowsePage() {
  const navigate = useNavigate();
  let { tutorials } = useContent("tutorials");
  tutorials = [
    {
      title: "Favorites",
      data: tutorials
        .filter((item) => item.genre === "mathematics")
        .sort((a, b) => a.slug.localeCompare(b.slug)),
    },
    {
      title: "AI-Edge Habit Mechanic ® Organizational Transform Program",
      data: tutorials
        .filter((item) => item.genre === "science")
        .sort((a, b) => a.slug.localeCompare(b.slug)),
    },
  ];

  let { courses } = useContent("courses");
  courses = [
    {
      title: "Favorites",
      data: courses
        .filter((item) => item.genre === "mathematics")
        .sort((a, b) => a.slug.localeCompare(b.slug)),
    },
    {
      title: "AI-Edge Habit Mechanic ® Organizational Transform Program",
      data: courses
        .filter((item) => item.genre === "science")
        .sort((a, b) => a.slug.localeCompare(b.slug)),
    },
  ];

  const [category, setCategory] = useState("courses");
  const currentCategory = category === "courses" ? courses : tutorials;
  const [showPlayer, setShowPlayer] = useState(false);
  const [burgerAnchorEl, setBurgerAnchorEl] = useState(null);
  const burgerMenuOpen = Boolean(burgerAnchorEl);
  const [showTeaPlanSection, setShowTeaPlanSection] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setHeaderSolid(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  console.log("currentCategory", currentCategory);

  return (
    <>
      <HeaderWrapper
        className={`header-wrapper-browse${headerSolid ? " solid" : ""}`}
      >
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
            onClick={(e) => setBurgerAnchorEl(e.currentTarget)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <Menu
            anchorEl={burgerAnchorEl}
            open={burgerMenuOpen}
            onClose={() => setBurgerAnchorEl(null)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem
              selected={category === "courses"}
              onClick={() => {
                setCategory("courses");
                setBurgerAnchorEl(null);
              }}
            >
              Courses
            </MenuItem>
            <MenuItem
              selected={category === "tutorials"}
              onClick={() => {
                setCategory("tutorials");
                setBurgerAnchorEl(null);
              }}
            >
              Tutorials
            </MenuItem>
          </Menu>
        </NavBar>
      </HeaderWrapper>
      <div
        className="feature-wrapper-browse"
        style={{
          background: "url('/images/misc/banner.png') no-repeat center center",
          backgroundSize: "cover",
        }}
      >
        <div className="feature-wrapper-browse-content">
          <h1 className="feature-title-browse">
            Unlock Learning Like Never Before
          </h1>
          <p className="feature-subtitle-browse">
            Master Math, Science, English, and more with our interactive
            learning platform. Get personalized lessons, real-time feedback, and
            smart progress tracking. Learn at your own pace and build confidence
            every step of the way.
          </p>
        </div>
        <button
          className="play-button"
          type="button"
          onClick={() => setShowPlayer(true)}
        >
          Play
        </button>
        {showPlayer ? (
          <PlayerOverlay onClick={() => setShowPlayer(false)}>
            <PlayerVideo src="./videos/video.mp4" type="video/mp4" />
          </PlayerOverlay>
        ) : null}
      </div>
      <FavoritesRow
        slideItem={
          currentCategory?.find((i) => i.title === "Favorites")?.data
        }
        category={category}
      />
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
