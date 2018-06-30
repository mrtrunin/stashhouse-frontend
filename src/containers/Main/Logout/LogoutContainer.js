import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "api/UserAuth/LogoutAction";

export class LogoutContainer extends Component {
  render() {
    if (this.props.isLoggedIn) {
      logout();
    }
    return <Redirect to="/" />;
  }
}

LogoutContainer.propTypes = {
  isLoggedIn: PropTypes.bool
};

export default connect(store => {
  return {
    isLoggedIn: store.user.isLoggedIn
  };
})(LogoutContainer);
