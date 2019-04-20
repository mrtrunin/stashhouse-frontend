import React from "react";
import PropTypes from "prop-types";
import LoaderBar from "./LoaderBar";

const Loader = ({ fetching }) => {
  if (!fetching) {
    return null;
  }

  return <LoaderBar />;
};

Loader.propTypes = {
  fetching: PropTypes.bool.isRequired
};

export default Loader;
