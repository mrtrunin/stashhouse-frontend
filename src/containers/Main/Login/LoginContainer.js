import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import loginWithGoogle from "api/UserAuth/LoginWithGoogleAction";
import { login } from "api/UserAuth/LoginAction";
import { fetchUserData } from "api/fetchUserData";

import Message from "components/Message";
import LoginBox from "./LoginBox";

class LoginContainer extends Component {
  state = {
    username: "",
    password: "",
    isLoading: false,
    redirect: false
  };

  onSubmit = async e => {
    e.preventDefault();
    await this.setState({ isLoading: true });
    try {
      await login(this.state);
      await fetchUserData();
    } catch (error) {
      Message(error);
    }
  };

  handleChange = name => event => {
    event.preventDefault();
    this.setState({ [name]: event.target.value });
  };

  googleLogin = async props => {
    try {
      await loginWithGoogle(props);
      await fetchUserData();
    } catch (error) {
      Message(error);
    }
  };

  render() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect push exact to="/business-choice" />;
    }

    return (
      <LoginBox
        onSubmit={this.onSubmit}
        handleChange={this.handleChange}
        googleLogin={this.googleLogin}
      />
    );
  }
}

LoginContainer.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string
  }),
  isLoggedIn: PropTypes.bool
};

export default connect(store => {
  return {
    user: store.user.user,
    isLoggedIn: store.user.isLoggedIn
  };
})(LoginContainer);
