import React, { useEffect, useState } from "react";
import { tutorials, courses } from "../seed";

function useContent(target) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (target === "courses") {
      setContent(courses);
    } else if (target === "tutorials") {
      setContent(tutorials);
    } else {
      console.log("Invalid target for content");
    }
  }, [target]);

  return { [target]: content };
}

export default useContent;
