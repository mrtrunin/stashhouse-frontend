import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actions from "./LoginActions";

import Message from "components/Message/Message";
import LoginBox from "./components/LoginBox";

const Login = props => {
  const {
    isLoggedIn,
    actions: { login, fetchUserData, loginWithGoogle }
  } = props;

  const [state, setState] = useState({
    username: "",
    password: "",
    isLoading: false,
    redirect: false
  });

  const onSubmit = async e => {
    e.preventDefault();

    try {
      await setState({ ...state, isLoading: true });
      await login(state);
      await fetchUserData();
    } catch (error) {
      Message("Could not submit login: " + error, "error");
    }
  };

  const handleChange = name => event => {
    event.preventDefault();
    setState({ ...state, [name]: event.target.value });
  };

  const googleLogin = async googleProps => {
    await setState({ ...state, isLoading: true });
    await loginWithGoogle(googleProps);
    await fetchUserData();
  };

  if (isLoggedIn) {
    return <Redirect push exact to="/businesses" />;
  }

  return (
    <LoginBox
      onSubmit={onSubmit}
      handleChange={handleChange}
      googleLogin={googleLogin}
    />
  );
};

Login.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string
  }),
  isLoggedIn: PropTypes.bool,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user.user,
    isLoggedIn: state.user.isLoggedIn,
    accessToken: state.auth.authToken.accessToken
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
)(Login);
