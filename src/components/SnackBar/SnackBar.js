import { connect } from "react-redux";

import React, { Component } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";

import closeMessage from "./actions/closeMessage";

class SnackBar extends Component {
  static propTypes = {};

  render() {
    return (
      <Snackbar
        open={this.props.open}
        message={this.props.snackBarMessage}
        onClose={closeMessage}
        autoHideDuration={3000}
      />
    );
  }
}

SnackBar.propTypes = {
  snackBarMessage: PropTypes.string,
  open: PropTypes.bool
};

export default connect(store => {
  return {
    snackBarMessage: store.snackBarMessage.message,
    open: store.snackBarMessage.open
  };
})(SnackBar);
