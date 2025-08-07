import React from "react";
import "./HeaderStyles.css";
import "../../pages/Browse/browse.scss";

function SigninButton({ children, ...restProps }) {
  return (
    <div>
      <a className="signin-button" href="/signin" {...restProps}>
        {children}
      </a>
    </div>
  );
}

export default SigninButton;
