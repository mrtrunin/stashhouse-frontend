import React from "react";
import PropTypes from "prop-types";
import { Grid, withStyles } from "@material-ui/core";

const style = theme => ({
  flex: {
    flex: 1
  },
  buttons: {
    padding: theme.spacing.unit * 2
  },
  button: {
    marginLeft: theme.spacing.unit
  }
});

const ButtonRow = props => {
  const { show, classes, children } = props;

  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { className: classes.button })
  );

  return show ? (
    <Grid container>
      <Grid item className={classes.flex} />

      <Grid item className={classes.buttons}>
        {childrenWithProps}
      </Grid>
    </Grid>
  ) : (
    ""
  );
};

ButtonRow.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(ButtonRow);
