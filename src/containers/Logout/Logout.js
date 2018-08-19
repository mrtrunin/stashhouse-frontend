import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import * as actions from "./LogoutActions";

export class Logout extends Component {
  render() {
    const {
      isLoggedIn,
      actions: { logout }
    } = this.props;
    if (isLoggedIn) {
      logout();
    }
    return <Redirect to="/" />;
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
