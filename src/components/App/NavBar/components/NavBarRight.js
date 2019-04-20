import React from "react";
import PropTypes from "prop-types";
import { Toolbar, Button, withStyles, Hidden } from "@material-ui/core";
import { PowerSettingsNew } from "@material-ui/icons";
import NavBarRightSmall from "./NavBarRightSmall";
import NavBarRightLarge from "./NavBarRightLarge";

const style = theme => ({
  iconLeft: {
    marginRight: theme.spacing.unit
  }
});

const NavBarRight = ({ classes, isLoggedIn, business }) => {
  if (!isLoggedIn) {
    return (
      <Toolbar className={classes.iconLeft}>
        <Button href="/login" color="inherit">
          <PowerSettingsNew className={classes.iconLeft} />
          Login
        </Button>
      </Toolbar>
    );
  }

  return (
    <>
      <Hidden lgUp>
        <NavBarRightSmall business={business} />
      </Hidden>
      <Hidden mdDown>
        <NavBarRightLarge business={business} />
      </Hidden>
    </>
  );
};

NavBarRight.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  business: PropTypes.object
};

export default withStyles(style)(NavBarRight);
