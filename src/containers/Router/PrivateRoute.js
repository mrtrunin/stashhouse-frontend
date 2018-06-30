import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends Component {
  render() {
    let isLoggedIn = this.props.isLoggedIn;

    if (isLoggedIn) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login/" />;
    }
  }
}

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  render: PropTypes.func
};

export default connect(store => {
  return {
    user: store.user.user,
    isLoggedIn: store.user.isLoggedIn
  };
})(PrivateRoute);
