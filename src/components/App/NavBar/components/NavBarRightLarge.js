import React from "react";
import PropTypes from "prop-types";
import { Toolbar, Button, Hidden, withStyles } from "@material-ui/core";
import { Settings, PowerSettingsNew } from "@material-ui/icons";
import NavBarBusinessSelector from "./NavBarBusinessSelector";

const style = theme => ({
  iconLeft: {
    marginRight: theme.spacing.unit
  }
});

const NavBarRightLarge = ({ business, classes }) => {
  return (
    <Toolbar className={classes.iconLeft}>
      {business.name && (
        <>
          <Button
            href="/settings"
            color="inherit"
            variant="text"
            size="small"
            mini
          >
            <Settings />
          </Button>

          <NavBarBusinessSelector />
        </>
      )}

      <Button href="/logout" color="inherit" variant="text">
        <PowerSettingsNew className={classes.iconLeft} />
        <Hidden mdDown>Log out</Hidden>
      </Button>
    </Toolbar>
  );
};

NavBarRightLarge.propTypes = {
  classes: PropTypes.object.isRequired,
  business: PropTypes.object
};

export default withStyles(style)(NavBarRightLarge);
