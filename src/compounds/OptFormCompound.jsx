import React from "react";
import OptFormWrapper from "../components/OptForm/OptFormWrapper";
import OptFormText from "../components/OptForm/OptFormText";
import OptFormEmail from "../components/OptForm/OptFormEmail";
import OptFormButton from "../components/OptForm/OptFormButton";

function OptFormCompound() {
  return (
    <>
      <OptFormText>
        Ready to begin? Enter your email to join or continue your learning
        journey.
      </OptFormText>
      <OptFormWrapper>
        <OptFormEmail placeholder="Email Address" />
        <OptFormButton>Get Started</OptFormButton>
      </OptFormWrapper>
    </>
  );
}

export default OptFormCompound;
