import React from "react";
import HeaderWrapper from "../components/Header/HeaderWrapper";
import NavBar from "../components/Header/NavBar";
import Logo from "../components/Header/Logo";
import SigninButton from "../components/Header/SigninButton";
import Warning from "../components/Header/Warning";

function HeaderCompound({ children }) {
  return (
    <HeaderWrapper className="header-wrapper-home">
      <NavBar className="navbar-home">
        <Logo />
        <SigninButton>Sign In</SigninButton>
      </NavBar>
      <div className="feature-wrapper-home">
        <h1 className="feature-title-home">
          Unlimited movies, TV shows and more.
        </h1>
        <Warning>This is NOT official Netflix</Warning>
      </div>
      {children}
    </HeaderWrapper>
  );
}

export default HeaderCompound;
