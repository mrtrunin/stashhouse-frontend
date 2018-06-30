import React from "react";
import PropTypes from "prop-types";
import { Button, withStyles } from "@material-ui/core";

import ArrowForward from "@material-ui/icons/ArrowForward";
import Add from "@material-ui/icons/Add";
import AttachMoney from "@material-ui/icons/AttachMoney";

import ButtonRow from "components/ButtonRow";

const style = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

const TransactionCreationButtons = props => {
  const { classes, show } = props;
  if (show) {
    return (
      <ButtonRow show>
        <Button href="/sell" color="primary" variant="raised">
          <AttachMoney className={classes.leftIcon} />
          Sell
        </Button>

        <Button href="/move" color="primary" variant="raised">
          <ArrowForward className={classes.leftIcon} />
          Move
        </Button>

        <Button href="/buy" color="primary" variant="raised">
          <Add className={classes.leftIcon} />
          Buy
        </Button>
      </ButtonRow>
    );
  } else return "";
};

TransactionCreationButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired
};

export default withStyles(style)(TransactionCreationButtons);
