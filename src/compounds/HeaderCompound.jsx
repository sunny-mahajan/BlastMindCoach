import React from "react";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import NavBar from "../components/Header/NavBar";
import Logo from "../components/Header/Logo";
import SigninButton from "../components/Header/SigninButton";
import Warning from "../components/Header/Warning";

function HeaderCompound({ children }) {
  return (
    <HeaderWrapper className="header-wrapper-home">
      <div className="navbar-wrapper">
        <NavBar className="navbar-home">
          <p className="navbar-brand-text">Blast Mind Coach</p>
          <SigninButton>Sign In</SigninButton>
        </NavBar>
      </div>
      <div className="feature-wrapper-home">
        <h1 className="feature-title-home">
          Unlimited Learning, Mentorship, and Growth.
        </h1>
      </div>
      {children}
    </HeaderWrapper>
  );
}

export default HeaderCompound;
