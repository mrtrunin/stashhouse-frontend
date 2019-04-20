import React, { useState, useEffect } from "react";
import { LinearProgress } from "@material-ui/core";

const LoaderBar = () => {
  const [displayLoader, setDisplayLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setDisplayLoader(true);
    }, 300);
  });

  if (!displayLoader) {
    return null;
  }

  return <LinearProgress color="primary" variant="indeterminate" />;
};

export default LoaderBar;
