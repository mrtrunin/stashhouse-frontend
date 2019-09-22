import React from "react";
import PropTypes from "prop-types";
import { CardActions, withStyles } from "@material-ui/core";
import { Button } from "antd";

const EditorButtonStyle = () => ({
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
        <Button type="danger" className={classes.button} onClick={deleteAction}>
          Delete
        </Button>
      ) : (
        ""
      )}
      {editedObject && editedObject.id && updateAction ? (
        <Button
          type="primary"
          className={classes.button}
          onClick={updateAction}
        >
          Update
        </Button>
      ) : (
        createAction && (
          <Button
            type="primary"
            className={classes.button}
            onClick={createAction}
          >
            Add {editedObjectLabel}
          </Button>
        )
      )}

      {mainAction && (
        <Button type="primary" className={classes.button} onClick={mainAction}>
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

export default withStyles(EditorButtonStyle)(EditorButtons);
