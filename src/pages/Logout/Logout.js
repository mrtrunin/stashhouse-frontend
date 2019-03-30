import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import * as actions from "./LogoutActions";

const Logout = ({ isLoggedIn, actions: { logout } }) => {
  if (isLoggedIn) {
    logout();
  }
  return <Redirect to="/login" />;
};

Logout.propTypes = {
  isLoggedIn: PropTypes.bool,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
