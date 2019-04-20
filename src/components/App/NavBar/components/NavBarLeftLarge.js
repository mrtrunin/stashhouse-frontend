import React from "react";
import PropTypes from "prop-types";
import { Toolbar, Button, Hidden, withStyles } from "@material-ui/core";
import { List, Business, AttachMoney, People, Email } from "@material-ui/icons";

const style = theme => ({
  iconLeft: {
    marginRight: theme.spacing.unit
  }
});

const NavBarLeftLarge = ({ classes }) => {
  return (
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
    </Toolbar>
  );
};

NavBarLeftLarge.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(NavBarLeftLarge);
