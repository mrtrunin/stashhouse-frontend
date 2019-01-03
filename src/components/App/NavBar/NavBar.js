import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import store from "store";
import * as actions from "pages/Businesses/BusinessesActions";

import {
  Button,
  Toolbar,
  AppBar,
  withStyles,
  Typography,
  FormControl,
  Input,
  Select,
  MenuItem,
  Hidden,
  IconButton
} from "@material-ui/core";

import {
  Business,
  List,
  AttachMoney,
  People,
  PowerSettingsNew,
  Settings,
  Email
} from "@material-ui/icons";
import { bindActionCreators } from "redux";
import NavBarStyle from "./NavBarStyle";
import Loader from "../Loader/Loader";

class NavBar extends Component {
  componentDidUpdate = prevProps => {
    const {
      actions: { fetchBusinesses }
    } = this.props;
    if (
      prevProps.isLoggedIn !== this.props.isLoggedIn &&
      this.props.isLoggedIn
    ) {
      fetchBusinesses();
    }
  };

  handleChooseBusiness = (businesses, e) => {
    let selectedBusiness = businesses.find(business => {
      return business.name === e.target.value;
    });

    store.dispatch({
      type: "FETCH_BUSINESS_FULFILLED",
      payload: selectedBusiness
    });
  };

  render() {
    const { classes, isLoggedIn, businesses, business, fetching } = this.props;

    let navBarLeftLarge = "";
    let navBarRightLarge = "";
    let navBarLeftSmall = "";
    let navBarRightSmall = "";

    if (!isLoggedIn) {
      navBarLeftLarge = (
        <Toolbar>
          <Typography
            align="center"
            noWrap
            component={Link}
            className={classes.logo}
            to="/"
          >
            STASHHOUSE
          </Typography>
        </Toolbar>
      );

      navBarLeftSmall = navBarLeftLarge;

      navBarRightLarge = (
        <Toolbar className={classes.navBarRightLarge}>
          <Button href="/login" color="inherit">
            <PowerSettingsNew className={classes.iconLeft} />
            Login
          </Button>
        </Toolbar>
      );

      navBarRightSmall = navBarRightLarge;
    } else {
      navBarLeftLarge = (
        <Toolbar>
          <Button href="/warehouses" color="inherit" variant="text">
            <Business className={classes.iconLeft} />
            Products and Warehouse
          </Button>

          <Button href="/transactions" color="inherit" variant="text">
            <List className={classes.iconLeft} />
            <Hidden mdDown>Transactions</Hidden>
          </Button>

          <Button href="/payments" color="inherit" variant="text">
            <AttachMoney className={classes.iconLeft} />
            <Hidden mdDown>Payments</Hidden>
          </Button>

          <Button href="/customers" color="inherit" variant="text">
            <People className={classes.iconLeft} />
            <Hidden mdDown>Customers</Hidden>
          </Button>

          <Button href="/emails" color="inherit" variant="text">
            <Email className={classes.iconLeft} />
            <Hidden mdDown>Emails</Hidden>
          </Button>

          {/* <Button href="/reports" color="inherit" variant="text">
            <List className={classes.iconLeft} />
            <Hidden mdDown>Reports</Hidden>
          </Button> */}
        </Toolbar>
      );

      navBarLeftSmall = (
        <Toolbar>
          <IconButton href="/warehouses" color="inherit" variant="text">
            <Business />
          </IconButton>

          <IconButton href="/transactions" color="inherit" variant="text">
            <List />
          </IconButton>

          <IconButton href="/payments" color="inherit" variant="text">
            <AttachMoney />
          </IconButton>

          <IconButton href="/customers" color="inherit" variant="text">
            <People />
          </IconButton>

          <IconButton href="/emails" color="inherit" variant="text">
            <Email />
          </IconButton>

          {/* <IconButton href="/reports" color="inherit" variant="text">
            <List />
          </IconButton> */}
        </Toolbar>
      );

      navBarRightLarge = (
        <Toolbar className={classes.navBarRightLarge}>
          {business.name && (
            <div>
              <Button
                href="/settings"
                color="inherit"
                variant="text"
                size="small"
                mini
              >
                <Settings />
              </Button>

              <FormControl className={classes.businessSelector}>
                {/* <InputLabel htmlFor="business">Business</InputLabel> */}
                <Select
                  value={business.name ? business.name : ""}
                  onChange={this.handleChooseBusiness.bind(null, businesses)}
                  name="business"
                  renderValue={value => value}
                  input={<Input id="business" />}
                  className={classes.businessSelector}
                >
                  {businesses.map(business => {
                    return (
                      <MenuItem key={business.id} value={business.name}>
                        {business.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          )}

          <Button href="/logout" color="inherit" variant="text">
            <PowerSettingsNew className={classes.iconLeft} />
            <Hidden mdDown>Log out</Hidden>
          </Button>
        </Toolbar>
      );

      navBarRightSmall = (
        <Toolbar>
          {business.name && (
            <div>
              <IconButton href="/settings" color="inherit" variant="text">
                <Settings />
              </IconButton>

              <Hidden xsDown>
                <FormControl className={classes.businessSelector}>
                  {/* <InputLabel htmlFor="business">Business</InputLabel> */}
                  <Select
                    value={business.name ? business.name : ""}
                    onChange={this.handleChooseBusiness.bind(null, businesses)}
                    name="business"
                    renderValue={value => value}
                    input={<Input id="business" />}
                    className={classes.businessSelector}
                  >
                    {businesses.map(business => {
                      return (
                        <MenuItem key={business.id} value={business.name}>
                          {business.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Hidden>
            </div>
          )}

          <IconButton href="/logout" color="inherit" variant="text">
            <PowerSettingsNew />
          </IconButton>
        </Toolbar>
      );
    }
    return (
      <AppBar elevation={0}>
        <Toolbar disableGutters>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            <Hidden lgUp>{navBarLeftSmall}</Hidden>
            <Hidden mdDown>{navBarLeftLarge}</Hidden>
          </Typography>
          <Hidden lgUp>{navBarRightSmall}</Hidden>
          <Hidden mdDown>{navBarRightLarge}</Hidden>
        </Toolbar>
        <Loader fetching={fetching} />
      </AppBar>
    );
  }
}
NavBar.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string
  }),
  businesses: PropTypes.array.isRequired,
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
    businesses: state.businesses.businesses,
    business: state.business.business,
    user: state.user.user,
    isLoggedIn: state.user.isLoggedIn,
    transactions: state.transactions.transactions,
    fetching: fetching
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
)(withStyles(NavBarStyle)(NavBar));