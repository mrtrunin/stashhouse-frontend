import React from "react";
import { Toolbar, IconButton } from "@material-ui/core";
import { Business, AttachMoney, People, Email, List } from "@material-ui/icons";

const NavBarLeftSmall = () => {
  return (
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
    </Toolbar>
  );
};

export default NavBarLeftSmall;
