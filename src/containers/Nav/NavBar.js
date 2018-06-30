import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  Button,
  Toolbar,
  AppBar,
  withStyles,
  Typography
} from "@material-ui/core";

import {
  Business,
  List,
  AttachMoney,
  People,
  PowerSettingsNew
} from "@material-ui/icons";

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
  }
});

class NavBar extends Component {
  // componentDidMount = () => {
  //   if (this.props.isLoggedIn) {
  //     fetchTransactions("NAVBAR COMPONENT DID MOUNT");
  //   }
  // };

  // componentDidUpdate = prevProps => {
  //   if (
  //     prevProps.transactions.length !== this.props.transactions.length &&
  //     this.props.isLoggedIn
  //   ) {
  //     fetchTransactions("NAVBAR COMPONENT DID UPDATE");
  //   }
  // };

  render() {
    const { classes, isLoggedIn } = this.props;

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

          <Button href="/transaction-list" color="inherit" variant="flat">
            <List className={classes.leftIcon} />
            Transactions
          </Button>

          <Button href="/payment-list" color="inherit" variant="flat">
            <AttachMoney className={classes.leftIcon} />
            Payments
          </Button>

          <Button href="/customer-list" color="inherit" variant="flat">
            <People className={classes.leftIcon} />
            Customers
          </Button>
        </Toolbar>
      );

      navBarRight = (
        <Button href="/logout" color="inherit" variant="flat">
          <PowerSettingsNew className={classes.leftIcon} />
          Log out
        </Button>
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
  user: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string
  }),
  isLoggedIn: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  transactions: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default connect(store => {
  return {
    user: store.user.user,
    isLoggedIn: store.user.isLoggedIn,
    transactions: store.transactions.transactions
  };
})(withStyles(styles)(NavBar));
