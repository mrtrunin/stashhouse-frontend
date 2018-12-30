import React from "react";
import PropTypes from "prop-types";
import { CardHeader, IconButton, Typography } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const EditorHeader = props => {
  const {
    editedObject,
    existsEditedObject,
    addNewObjectLabel,
    updateExistingObjectLabel,
    hideEditor,
    editedObjectSubheader
  } = props;

  let { label } = props;

  if (!label) {
    label = addNewObjectLabel;

    if (editedObject && editedObject.name) {
      label = editedObject.name;
    }

    if (existsEditedObject) {
      label = updateExistingObjectLabel;
    }
  }

  return (
    <CardHeader
      action={
        hideEditor && (
          <IconButton onClick={hideEditor}>
            <ClearIcon />
          </IconButton>
        )
      }
      title={<Typography variant="h4">{label}</Typography>}
      subheader={editedObjectSubheader}
    />
  );
};

EditorHeader.propTypes = {
  label: PropTypes.string,
  editedObject: PropTypes.object,
  addNewObjectLabel: PropTypes.string,
  updateExistingObjectLabel: PropTypes.string,
  hideEditor: PropTypes.func,
  editedObjectSubheader: PropTypes.string,
  existsEditedObject: PropTypes.bool
};

export default EditorHeader;
