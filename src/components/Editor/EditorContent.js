import React from "react";
import PropTypes from "prop-types";
import { CardContent, withStyles } from "@material-ui/core";

const EditorContentStyle = () => ({
  content: {
    display: "flex",
    flexDirection: "column"
  }
});

const EditorContent = props => {
  const { classes } = props;
  return (
    <CardContent className={classes.content}>{props.children}</CardContent>
  );
};

EditorContent.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object.isRequired
};

export default withStyles(EditorContentStyle)(EditorContent);
