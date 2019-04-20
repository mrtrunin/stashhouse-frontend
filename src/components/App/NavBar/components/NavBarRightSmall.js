import React from "react";
import PropTypes from "prop-types";
import NavBarBusinessSelector from "./NavBarBusinessSelector";
import { Toolbar, IconButton, Hidden } from "@material-ui/core";
import { Settings, PowerSettingsNew } from "@material-ui/icons";

const NavBarRightSmall = ({ business }) => {
  return (
    <Toolbar>
      {business.name && (
        <>
          <IconButton href="/settings" color="inherit" variant="text">
            <Settings />
          </IconButton>

          <Hidden xsDown>
            <NavBarBusinessSelector />
          </Hidden>
        </>
      )}

      <IconButton href="/logout" color="inherit" variant="text">
        <PowerSettingsNew />
      </IconButton>
    </Toolbar>
  );
};

NavBarRightSmall.propTypes = {
  business: PropTypes.object
};

export default NavBarRightSmall;
