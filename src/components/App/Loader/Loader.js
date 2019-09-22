import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LoaderBar from "./LoaderBar";

const Loader = ({ fetching }) => {
  const [showLoader, setShowLoader] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!fetching) {
      setShowLoader(false);
    }

    setTimeout(() => {
      if (fetching) {
        setShowLoader(true);
      }
    }, 350);
  });

  if (showLoader) {
    return <LoaderBar />;
  }

  return null;
};

Loader.propTypes = {
  fetching: PropTypes.bool.isRequired
};

export default Loader;

// state= {
//   loading: true,
//   showLoader: false
// }

// componentDidMount() {
//    setTimeout(() => {
//      if(this.loading){
//          this.setState({ showLoader: true })
//      }
//    }, 1000);
// }
// render() {
//   if(this.state.showLoader) {
//        return <div className="loader" />;
//   }
// }
