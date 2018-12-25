import React from "react";
import PropTypes from "prop-types";
import { LoaderBar } from "./LoaderBar";

class Loader extends React.Component {
  render() {
    const { fetching } = this.props;

    if (!fetching) {
      return null;
    }

    return <LoaderBar />;
  }
}

Loader.propTypes = {
  fetching: PropTypes.bool.isRequired
};

export default Loader;
