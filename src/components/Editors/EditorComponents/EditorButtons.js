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
    mainAction,
    mainActionLabel,
    editedObject,
    editedObjectLabel
  } = props;
  return (
    <CardActions>
      {editedObject && editedObject.id && deleteAction ? (
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
      {editedObject && editedObject.id && updateAction ? (
        <Button
          variant="raised"
          color="primary"
          className={classes.button}
          onClick={updateAction}
        >
          Update
        </Button>
      ) : (
        createAction && (
          <Button
            variant="raised"
            color="primary"
            className={classes.button}
            onClick={createAction}
          >
            Add {editedObjectLabel}
          </Button>
        )
      )}

      {mainAction && (
        <Button
          variant="raised"
          color="primary"
          className={classes.button}
          onClick={mainAction}
        >
          {mainActionLabel}
        </Button>
      )}
    </CardActions>
  );
};

EditorButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteAction: PropTypes.func,
  updateAction: PropTypes.func,
  createAction: PropTypes.func,
  editedObject: PropTypes.object,
  editedObjectLabel: PropTypes.string,
  mainAction: PropTypes.func,
  mainActionLabel: PropTypes.string
};

export default withStyles(style)(EditorButtons);
