import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as businessesActions from "pages/Businesses/BusinessesActions";

import { Toolbar, AppBar, withStyles, Typography } from "@material-ui/core";

import { bindActionCreators } from "redux";
import Loader from "../Loader/Loader";

import NavBarLeft from "./components/NavBarLeft";
import NavBarRight from "./components/NavBarRight";

const style = theme => ({
  flex: {
    flex: 1
  }
});

const NavBar = ({
  actions: { fetchBusinesses },
  isLoggedIn,
  classes,
  business,
  fetching
}) => {
  useEffect(() => {
    return () => {
      fetchBusinesses();
    };
  }, [isLoggedIn]);

  return (
    <AppBar elevation={0}>
      <Toolbar disableGutters>
        <Typography variant="h6" color="inherit" className={classes.flex}>
          <NavBarLeft isLoggedIn={isLoggedIn} />
        </Typography>
        <NavBarRight isLoggedIn={isLoggedIn} business={business} />
      </Toolbar>
      <Loader fetching={fetching} />
    </AppBar>
  );
};
NavBar.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string
  }),
  business: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  fetching: PropTypes.bool
};

const mapStateToProps = state => {
  const fetching = Object.keys(state).some(key => {
    return state[key].fetching;
  });

  return {
    business: state.business.business,
    user: state.user.user,
    isLoggedIn: state.user.isLoggedIn,
    transactions: state.transactions.transactions,
    fetching: fetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...businessesActions }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(NavBar));
