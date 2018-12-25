import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends Component {
  render() {
    const { isLoggedIn, business, path } = this.props;

    const noBusinessSelected = Object.keys(business).length === 0;
    const onBusinessesPage = path === "/businesses/";

    if (isLoggedIn && noBusinessSelected && !onBusinessesPage) {
      return <Redirect to="/businesses/" />;
    }

    if (isLoggedIn) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login/" />;
    }
  }
}

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
  render: PropTypes.func,
  business: PropTypes.object,
  path: PropTypes.string
};

export default connect(store => {
  return {
    user: store.user.user,
    isLoggedIn: store.user.isLoggedIn,
    business: store.business.business
  };
})(PrivateRoute);
