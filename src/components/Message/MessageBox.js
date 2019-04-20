import React from "react";
import { Snackbar } from "@material-ui/core";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as actions from "./MessageActions";
import { connect } from "react-redux";
import MessageBoxContent from "./MessageBoxContent";

const MessageBox = ({ message, open, variant, actions: { closeMessage } }) => {
  return (
    <Snackbar open={open} onClose={closeMessage} autoHideDuration={3000}>
      <MessageBoxContent
        onClose={closeMessage}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
};

MessageBox.propTypes = {
  actions: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

MessageBox.defaultProps = {
  variant: "info"
};

const mapStateToProps = state => {
  return {
    message: state.message.message,
    open: state.message.open,
    variant: state.message.variant
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...actions
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageBox);
