import React from "react";
import PropTypes from "prop-types";
import { Grid, Button, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

export const style = theme => ({
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

const WarehousesButtons = ({
  classes,
  setShowProductEditor,
  setShowWarehouseEditor
}) => {
  return (
    <Grid container>
      <Grid item className={classes.flex} />
      <Grid item className={classes.buttons}>
        <Button
          onClick={() => setShowProductEditor(true)}
          variant="contained"
          color="primary"
          component={Link}
          to="/warehouses/"
          className={classes.button}
        >
          Add New Product
        </Button>
        <Button
          onClick={() => setShowWarehouseEditor(true)}
          variant="contained"
          color="primary"
          component={Link}
          to="/warehouses/"
          className={classes.button}
        >
          Add New Warehouse
        </Button>
      </Grid>
    </Grid>
  );
};

WarehousesButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  setShowProductEditor: PropTypes.func.isRequired,
  setShowWarehouseEditor: PropTypes.func.isRequired
};

export default withStyles(style)(WarehousesButtons);
