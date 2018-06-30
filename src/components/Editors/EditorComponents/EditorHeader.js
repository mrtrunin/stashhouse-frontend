import React from "react";
import PropTypes from "prop-types";
import { CardHeader, IconButton, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const EditorHeader = props => {
  const {
    editedObject,
    existsEditedObject,
    editedObjectLabel,
    hideEditor,
    editedObjectSubheader
  } = props;

  let label = "Add New " + editedObjectLabel;

  if (editedObject && editedObject.name) {
    label = editedObject.name;
  }

  if (existsEditedObject) {
    label = "Update " + editedObjectLabel;
  }

  return (
    <CardHeader
      action={
        <IconButton onClick={hideEditor}>
          <ClearIcon />
        </IconButton>
      }
      title={<Typography variant="display1">{label}</Typography>}
      subheader={editedObjectSubheader}
    />
  );
};

EditorHeader.propTypes = {
  editedObject: PropTypes.object,
  editedObjectLabel: PropTypes.string.isRequired,
  hideEditor: PropTypes.func.isRequired,
  editedObjectSubheader: PropTypes.string,
  existsEditedObject: PropTypes.bool
};

export default EditorHeader;
