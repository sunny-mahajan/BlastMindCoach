import React, { useEffect, useState } from "react";
import { series, films } from "../seed";

function useContent(target) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (target === "series") {
      setContent(series);
    } else if (target === "films") {
      setContent(films);
    } else {
      console.log("Invalid target for content");
    }
  }, [target]);

  return { [target]: content };
}

export default useContent;
