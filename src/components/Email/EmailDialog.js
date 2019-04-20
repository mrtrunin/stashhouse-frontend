import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, withStyles, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";

import * as emailActions from "components/Email/EmailActions";

import Editor from "components/Editor/Editor";
import EditorHeader from "components/Editor/EditorHeader";
import EditorContent from "components/Editor/EditorContent";
import EditorButtons from "components/Editor/EditorButtons";

import { bindActionCreators } from "redux";

export const EmailStyle = theme => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5]
  }
});

const EmailDialog = props => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const {
    transaction,
    business,
    actions: { sendEmail },
    open,
    handleClose,
    classes
  } = props;

  useEffect(() => {
    setTransactionAndResetState();
  }, [transaction]);

  const setTransactionAndResetState = () => {
    transaction &&
      transaction.customer &&
      transaction.customer.email &&
      setRecipientEmail(transaction.customer.email);
    transaction &&
      transaction.customer &&
      transaction.customer.email &&
      setRecipientName(transaction.customer.name);
    setSubject(
      business.default_email_subject + " " + transaction.full_transaction_number
    );
    setBody(business.default_email_body);
  };

  const handleRecipientChange = e => {
    setRecipientEmail(e.target.value);
  };

  const handleSubjectChange = e => {
    setSubject(e.target.value);
  };

  const handleBodyChange = e => {
    setBody(e.target.value);
  };

  const handleSendEmail = async () => {
    await sendEmail(
      business.name,
      transaction.id,
      recipientEmail,
      subject,
      body
    );

    await props.handleClose();
  };

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div className={classes.root}>
        <Editor>
          <EditorHeader
            label={
              "Email " +
              transaction.full_transaction_number +
              " to " +
              recipientName
            }
            hideEditor={handleClose}
          />

          <EditorContent>
            {/* TODO: Add link to invoice pdf here, so it'd be clear for the user what's going on */}
            <Typography variant="subtitle1" />
            <TextField
              name="from"
              value={business.email}
              label="From"
              margin="dense"
              required
            />
            <TextField
              name="to"
              value={recipientEmail}
              label="To"
              margin="dense"
              onChange={handleRecipientChange}
              required
            />
            <TextField
              name="subject"
              value={subject}
              label="Subject"
              margin="dense"
              onChange={handleSubjectChange}
              required
            />
            <TextField
              name="body"
              value={body}
              label="Body"
              margin="dense"
              onChange={handleBodyChange}
              required
              multiline
            />
          </EditorContent>

          <EditorButtons
            mainAction={handleSendEmail}
            mainActionLabel="Send email"
          />
        </Editor>
      </div>
    </Modal>
  );
};

EmailDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  transaction: PropTypes.object,
  business: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...emailActions }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(EmailStyle)(EmailDialog));
