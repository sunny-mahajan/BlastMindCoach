import React, { lazy, Suspense } from "react";
import ScreenLoader from "../components/ScreenLoader";

const asyncComponent = (importFunc) => {
  const LazyComponent = lazy(importFunc);

  return function AsyncComponentWrapper(props) {
    return (
      <Suspense fallback={<ScreenLoader />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

export default asyncComponent;
