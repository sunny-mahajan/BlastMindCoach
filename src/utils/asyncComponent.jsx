import React, { lazy, Suspense } from "react";

// Usage: asyncComponent(() => import("../pages/SomePage"))
const asyncComponent = (importFunc) => {
  const LazyComponent = lazy(importFunc);

  // Return a component that wraps with Suspense (customize fallback as needed)
  return function AsyncComponentWrapper(props) {
    return (
      <Suspense fallback={null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

export default asyncComponent;
