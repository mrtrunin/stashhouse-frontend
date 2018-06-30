import React from "react";
import PropTypes from "prop-types";
import { CardActions, Button, withStyles } from "@material-ui/core";

const style = () => ({
  button: {
    flex: 1
  }
});

const EditorButtons = props => {
  const {
    classes,
    deleteAction,
    updateAction,
    createAction,
    editedObject,
    editedObjectLabel
  } = props;
  return (
    <CardActions>
      {editedObject.id ? (
        <Button
          variant="raised"
          color="secondary"
          className={classes.button}
          onClick={deleteAction}
        >
          Delete
        </Button>
      ) : (
        ""
      )}
      {editedObject.id ? (
        <Button
          variant="raised"
          color="primary"
          className={classes.button}
          onClick={updateAction}
        >
          Update
        </Button>
      ) : (
        <Button
          variant="raised"
          color="primary"
          className={classes.button}
          onClick={createAction}
        >
          Add {editedObjectLabel}
        </Button>
      )}
    </CardActions>
  );
};

EditorButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteAction: PropTypes.func.isRequired,
  updateAction: PropTypes.func.isRequired,
  createAction: PropTypes.func.isRequired,
  editedObject: PropTypes.object,
  editedObjectLabel: PropTypes.string.isRequired
};

export default withStyles(style)(EditorButtons);
