import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderWrapper from "../../components/Header/HeaderWrapper";
import NavBar from "../../components/Header/NavBar";
import FooterCompound from "../../compounds/FooterCompound";
import Cookies from "js-cookie";
import AuthServices from "../../services/authService";
import { useForm } from "react-hook-form";
import "../../components/SignForm/SignFormStyles.scss";

function SignupPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  async function onSubmit(data) {
    clearErrors();
    try {
      const response = await AuthServices.signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      if (response.success === true && response.data.token) {
        Cookies.set("token", response.data.token, { expires: 7 });
        navigate("/browse");
      } else {
        setError("api", { type: "manual", message: response.message || "Signup failed" });
      }
    } catch (err) {
      setError("api", { type: "manual", message: err?.message || "Signup failed" });
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
            <h1 className="sign-form-title">Sign Up</h1>
            {errors.api && (
              <div className="sign-form-error">
                <img src="/images/icons/close-slim.png" alt="Error" />
                {errors.api.message}
              </div>
            )}
            <input
              type="text"
              className={`sign-form-input${errors.firstName ? " error" : ""}`}
              placeholder="First Name"
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && (
              <div className="sign-form-error">
                <img src="/images/icons/close-slim.png" alt="Error" />
                {errors.firstName.message}
              </div>
            )}
            <input
              type="text"
              className={`sign-form-input${errors.lastName ? " error" : ""}`}
              placeholder="Last Name"
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && (
              <div className="sign-form-error">
                <img src="/images/icons/close-slim.png" alt="Error" />
                {errors.lastName.message}
              </div>
            )}
            <input
              type="text"
              className={`sign-form-input${errors.email ? " error" : ""}`}
              placeholder="Email Address"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <div className="sign-form-error">
                <img src="/images/icons/close-slim.png" alt="Error" />
                {errors.email.message}
              </div>
            )}
            <input
              type="password"
              className={`sign-form-input${errors.password ? " error" : ""}`}
              placeholder="Password"
              autoComplete="off"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Your password must contain between 4 and 60 characters.",
                },
                maxLength: {
                  value: 60,
                  message: "Your password must contain between 4 and 60 characters.",
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
              Sign Up
            </button>
            <p className="sign-form-text">
              Already a user?
              <a className="sign-form-link" href="/signin">
                Sign in now.
              </a>
            </p>
            <p className="sign-form-captcha">
              This page is protected by Google reCAPTCHA to ensure you are not a bot.
            </p>
          </form>
        </div>
      </HeaderWrapper>
      <FooterCompound />
    </>
  );
}

export default SignupPage;
