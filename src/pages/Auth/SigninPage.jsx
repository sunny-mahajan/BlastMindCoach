import React, { useState } from "react";
import NavBar from "../../components/Header/NavBar";
import Logo from "../../components/Header/Logo";
import FooterCompound from "../../compounds/FooterCompound";
import SignFormWrapper from "../../components/SignForm/SignFormWrapper";
import SignFormBase from "../../components/SignForm/SignFormBase";
import SignFormTitle from "../../components/SignForm/SignFormTitle";
import SignFormInput from "../../components/SignForm/SignFormInput";
import SignFormButton from "../../components/SignForm/SignFormButton";
import SignFormText from "../../components/SignForm/SignFormText";
import SignFormLink from "../../components/SignForm/SignFormLink";
import SignFormCaptcha from "../../components/SignForm/SignFormCaptcha";
import Warning from "../../components/Header/Warning";
import { useNavigate } from "react-router-dom";
import HeaderWrapper from "../../components/Header/HeaderWrapper";

function SigninPage() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const IsInvalid = password === "" || emailAddress === "";

  function handleSubmit(event) {
    event.preventDefault();

    console.log(emailAddress, password);
    navigate("/browse");
  }

  return (
    <>
      <HeaderWrapper className="header-wrapper-home">
        <NavBar className="navbar-signin">
          <Logo />
        </NavBar>
        <SignFormWrapper>
          <SignFormBase onSubmit={handleSubmit} method="POST">
            <Warning>NOT official Netflix</Warning>
            <SignFormTitle>Sign In</SignFormTitle>
            <SignFormInput
              type="text"
              placeholder="Email Address"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <SignFormInput
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <SignFormButton disabled={IsInvalid}>Sign In</SignFormButton>
            <SignFormText>
              New to Netflix?
              <SignFormLink href="/signup">Sign up now.</SignFormLink>
            </SignFormText>
            <SignFormCaptcha>
              This page is protected by Google reCAPTCHA to ensure you are not a
              bot.
            </SignFormCaptcha>
          </SignFormBase>
        </SignFormWrapper>
      </HeaderWrapper>
      <FooterCompound />
    </>
  );
}

export default SigninPage;
