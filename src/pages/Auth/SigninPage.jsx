import React from "react";
import NavBar from "../../components/Header/NavBar";
import Logo from "../../components/Header/Logo";
import FooterCompound from "../../compounds/FooterCompound";

import { useNavigate } from "react-router-dom";
import HeaderWrapper from "../../components/Header/HeaderWrapper";
import { useForm } from "react-hook-form";
import "../../components/SignForm/SignFormStyles.scss";
import AuthServices from "../../services/authService";
import Cookies from "js-cookie";

function SigninPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      const response = await AuthServices.signIn(data);

      if (response.success === true && response.data.token) {
        Cookies.set("token", response.data.token, { expires: 7 });
        navigate("/browse");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }

  return (
    <>
      <HeaderWrapper className="header-wrapper-home">
        <div className="navbar-wrapper">
          <NavBar className="navbar-signin">
            <p className="navbar-brand-text">Blast Mind Coach</p>
          </NavBar>
        </div>
        <div className="sign-form-wrapper">
          <form
            className="sign-form-base"
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
          >
            <h1 className="sign-form-title">Sign In</h1>

            <input
              type="text"
              className={`sign-form-input ${
                errors.emailAddress ? "error" : ""
              }`}
              placeholder="Email email"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.emailAddress && (
              <div className="sign-form-error">
                <img src="/images/icons/close-slim.png" alt="Error" />
                {errors.emailAddress.message}
              </div>
            )}

            <input
              type="password"
              className={`sign-form-input ${errors.password ? "error" : ""}`}
              placeholder="Password"
              autoComplete="off"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message:
                    "Your password must contain between 4 and 60 characters.",
                },
                maxLength: {
                  value: 60,
                  message:
                    "Your password must contain between 4 and 60 characters.",
                },
              })}
            />
            {errors.password && (
              <div className="sign-form-error">
                <img src="/images/icons/close-slim.png" alt="Error" />
                {errors.password.message}
              </div>
            )}
            <button type="submit" className="sign-form-Button">
              Sign In
            </button>
            <p className="sign-form-OR">OR</p>
            <button className="sign-form-code-button" type="button">
              Use a sign-in code
            </button>
            <a className="sign-form-forgot-password" href="/">
              Forgot password?
            </a>
            <div className="sign-form-remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <p className="sign-form-text">
              New to Blast Mind Coach?
              <a className="sign-form-link" href="/signup">
                Sign up now.
              </a>
            </p>
            <p className="sign-form-captcha">
              This page is protected by Google reCAPTCHA to ensure you are not a
              bot.
            </p>
          </form>
        </div>
      </HeaderWrapper>
      <FooterCompound />
    </>
  );
}

export default SigninPage;
