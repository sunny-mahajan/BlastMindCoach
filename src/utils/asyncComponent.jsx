import React from "react";
import { useLoading } from "../context/LoadingContext";

// Helper to allow setting loading state outside of React render
let setLoadingGlobal = null;
export const setGlobalLoadingSetter = (setter) => {
  setLoadingGlobal = setter;
};

const asyncComponent = (importComponent) => {
  return function AsyncComponentWrapper(props) {
    const { setLoading } = useLoading();
    React.useEffect(() => {
      setGlobalLoadingSetter(setLoading);
    }, [setLoading]);
    const LazyComponent = React.useMemo(() =>
      React.lazy(() => {
        if (setLoadingGlobal) setLoadingGlobal(true);
        return importComponent().finally(() => {
          if (setLoadingGlobal) setLoadingGlobal(false);
        });
      }),
    []);
    return <LazyComponent {...props} />;
  };
};

export default asyncComponent;
