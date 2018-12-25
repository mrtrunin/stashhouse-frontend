import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, withStyles, TextField, Typography } from "@material-ui/core";
import { EmailStyle } from "./EmailStyle";
import { connect } from "react-redux";

import * as transactionActions from "pages/Transaction/TransactionActions";

import Editor from "components/Editors/EditorComponents/Editor";
import EditorHeader from "components/Editors/EditorComponents/EditorHeader";
import EditorContent from "components/Editors/EditorComponents/EditorContent";
import EditorButtons from "components/Editors/EditorComponents/EditorButtons";

import { bindActionCreators } from "redux";

class Email extends Component {
  state = {
    senderEmail: "",
    recipientEmail: "",
    recipientName: "",
    subject: "",
    body: "",
    transaction: null
  };

  componentDidUpdate = prevProps => {
    const { transaction } = this.props;
    if (transaction && prevProps.transaction !== this.props.transaction) {
      this.settransactionAndResetState(transaction);
    }
  };

  settransactionAndResetState = transaction => {
    const { business } = this.props;
    this.setState(() => ({
      transaction: transaction,
      senderEmail: business.email,
      recipientEmail: transaction.customer.email,
      recipientName: transaction.customer.name,
      subject:
        business.default_email_subject +
        " " +
        transaction.full_transaction_number,
      body: business.default_email_body
    }));
  };

  handleSenderChange = e => {
    const senderEmail = e.target.value;
    this.setState({
      senderEmail: senderEmail
    });
  };

  handleRecipientChange = e => {
    const recipientEmail = e.target.value;
    this.setState({
      recipientEmail: recipientEmail
    });
  };

  handleSubjectChange = e => {
    const subject = e.target.value;
    this.setState({
      subject: subject
    });
  };

  handleBodyChange = e => {
    const body = e.target.value;
    this.setState({
      body: body
    });
  };

  handleSendEmail = async () => {
    const { transaction, recipientEmail, subject, body } = this.state;

    const {
      business,
      actions: { sendEmail }
    } = this.props;

    await sendEmail(
      business.name,
      transaction.id,
      recipientEmail,
      subject,
      body
    );

    await this.props.handleClose();
  };

  render() {
    const { open, handleClose, classes, transaction, business } = this.props;
    const { recipientName, recipientEmail, subject, body } = this.state;

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
              <Typography variant="subheading" />
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
                onChange={this.handleRecipientChange}
                required
              />
              <TextField
                name="subject"
                value={subject}
                label="Subject"
                margin="dense"
                onChange={this.handleSubjectChange}
                required
              />
              <TextField
                name="body"
                value={body}
                label="Body"
                margin="dense"
                onChange={this.handleBodyChange}
                required
                multiline
              />
            </EditorContent>

            <EditorButtons
              mainAction={this.handleSendEmail}
              mainActionLabel="Send email"
            />
          </Editor>
          {/* <Typography variant="title" id="modal-title">
          Send email
        </Typography>
        <Input>From</Input>
        <Input>To</Input>
        <Input>Subject</Input>
        <Input>Body</Input> */}
        </div>
      </Modal>
    );
  }
}

Email.propTypes = {
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
    actions: bindActionCreators({ ...transactionActions }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(EmailStyle)(Email));
