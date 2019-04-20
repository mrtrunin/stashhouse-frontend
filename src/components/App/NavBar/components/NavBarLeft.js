import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Typography, withStyles, Hidden } from "@material-ui/core";
import NavBarLeftSmall from "./NavBarLeftSmall";
import NavBarLeftLarge from "./NavBarLeftLarge";

const style = theme => ({
  logo: {
    textDecoration: "none",
    display: "inline",
    paddingLeft: theme.spacing.unit * 4,
    color: "white",
    fontWeight: 600,
    fontSize: "20px"
  }
});

const NavBarLeft = ({ classes, isLoggedIn }) => {
  if (!isLoggedIn) {
    return (
      <>
        <Typography
          align="center"
          noWrap
          component={Link}
          className={classes.logo}
          to="/"
        >
          STASHHOUSE
        </Typography>
      </>
    );
  }

  return (
    <>
      <Hidden lgUp>
        <NavBarLeftSmall />
      </Hidden>
      <Hidden mdDown>
        <NavBarLeftLarge />
      </Hidden>
    </>
  );
};

NavBarLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default withStyles(style)(NavBarLeft);
