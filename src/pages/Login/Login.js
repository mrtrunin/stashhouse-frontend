import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as actions from "./LoginActions";

import Message from "components/Message/Message";
import LoginBox from "./components/LoginBox";

class Login extends Component {
  state = {
    username: "",
    password: "",
    isLoading: false,
    redirect: false
  };

  onSubmit = async e => {
    e.preventDefault();
    const {
      actions: { login, fetchUserData }
    } = this.props;

    try {
      await this.setState({ isLoading: true });
      await login(this.state);
      await fetchUserData();
    } catch (error) {
      Message("Could not submit login: " + error, "error");
    }
  };

  handleChange = name => event => {
    event.preventDefault();
    this.setState({ [name]: event.target.value });
  };

  googleLogin = async props => {
    const {
      actions: { loginWithGoogle, fetchUserData }
    } = this.props;

    await loginWithGoogle(props);

    const { accessToken } = this.props;

    if (accessToken) {
      await fetchUserData();
    }
  };

  render() {
    const { isLoggedIn } = this.props;

    if (isLoggedIn) {
      return <Redirect push exact to="/businesses" />;
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
