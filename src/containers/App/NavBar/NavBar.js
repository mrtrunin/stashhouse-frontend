import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import store from "store";
import * as actions from "containers/Businesses/BusinessesActions";

import {
  Button,
  Toolbar,
  AppBar,
  withStyles,
  Typography,
  FormControl,
  Input,
  Select,
  MenuItem
} from "@material-ui/core";

import {
  Business,
  List,
  AttachMoney,
  People,
  PowerSettingsNew,
  Settings
} from "@material-ui/icons";
import { bindActionCreators } from "redux";

const styles = theme => ({
  root: {
    paddingRight: theme.spacing.unit * 2
  },
  flex: {
    flex: 1
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  logo: {
    textDecoration: "none",
    display: "inline",
    paddingLeft: theme.spacing.unit * 4,
    color: "white",
    fontWeight: 600,
    fontSize: "20px"
  },
  businessSelector: {
    color: "white"
  },
  smallButton: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit
  }
});

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
    const { classes, isLoggedIn, businesses, business } = this.props;

    let navBarLeft = "";
    let navBarRight = "";

    if (!isLoggedIn) {
      navBarLeft = (
        <Typography
          align="center"
          noWrap
          component={Link}
          className={classes.logo}
          to="/"
        >
          STASHHOUSE
        </Typography>
      );
      navBarRight = (
        <Button href="/login" color="inherit">
          <PowerSettingsNew className={classes.leftIcon} />
          Login
        </Button>
      );
    } else {
      navBarLeft = (
        <Toolbar>
          <Button href="/warehouse" color="inherit" variant="flat">
            <Business className={classes.leftIcon} />
            Products and Warehouse
          </Button>

          <Button href="/transactions" color="inherit" variant="flat">
            <List className={classes.leftIcon} />
            Transactions
          </Button>

          <Button href="/payments" color="inherit" variant="flat">
            <AttachMoney className={classes.leftIcon} />
            Payments
          </Button>

          <Button href="/customers" color="inherit" variant="flat">
            <People className={classes.leftIcon} />
            Customers
          </Button>
        </Toolbar>
      );

      navBarRight = (
        <Toolbar>
          {business.name && (
            <div>
              <Button
                href="/settings"
                color="inherit"
                variant="flat"
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

          <Button href="/logout" color="inherit" variant="flat">
            <PowerSettingsNew className={classes.leftIcon} />
            Log out
          </Button>
        </Toolbar>
      );
    }
    return (
      <AppBar elevation={0} className={classes.root}>
        <Toolbar disableGutters className={classes.toolbar}>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {navBarLeft}
          </Typography>
          {navBarRight}
        </Toolbar>
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
  transactions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

const mapStateToProps = state => {
  return {
    businesses: state.businesses.businesses,
    business: state.business.business,
    user: state.user.user,
    isLoggedIn: state.user.isLoggedIn,
    transactions: state.transactions.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(NavBar)
);
