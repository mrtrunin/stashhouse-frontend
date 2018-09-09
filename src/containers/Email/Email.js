import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, withStyles, TextField } from "@material-ui/core";
import { EmailStyle } from "./EmailStyle";
import Editor from "components/Editors/EditorComponents/Editor";
import EditorHeader from "components/Editors/EditorComponents/EditorHeader";
import EditorContent from "components/Editors/EditorComponents/EditorContent";
import EditorButtons from "components/Editors/EditorComponents/EditorButtons";

class Email extends Component {
  state = {
    sender: "",
    recipient: "",
    subject: "",
    body: "",
    transactionId: null
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { transactionId } = this.props;
    if (transactionId && prevProps.transactionId !== this.props.transactionId) {
      this.setTransactionIdAndResetState(transactionId);
    }
  };

  setTransactionIdAndResetState = transactionId => {
    this.setState(() => ({
      transactionId: transactionId,
      sender: "",
      recipient: "",
      subject: "",
      body: ""
    }));
  };

  handleEmailSenderChange = e => {
    const sender = e.target.value;
    this.setState({
      sender: sender
    });
  };

  handleEmailRecipientChange = e => {
    const recipient = e.target.value;
    this.setState({
      recipient: recipient
    });
  };

  handleEmailSubjectChange = e => {
    const subject = e.target.value;
    this.setState({
      subject: subject
    });
  };

  handleEmailBodyChange = e => {
    const body = e.target.value;
    this.setState({
      body: body
    });
  };

  handleSendEmail = () => {
    const { transactionId } = this.state;

    // const {
    //   business,
    //   actions: { sendEmail }
    // } = this.props;
    // const recipients = ["lars.trunin@gmail.com", "l.arstrunin@gmail.com"];
    // const subject = "Testin with Dima";
    // const body = "First <br> second";

    // sendEmail(business.name, transactionId, recipients, subject, body);
  };

  render() {
    const { open, handleClose, classes } = this.props;
    const { sender, recipient, subject, body } = this.state;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.root}>
          <Editor>
            <EditorHeader label="Send email" />
            <EditorContent>
              <TextField
                name="from"
                value={sender}
                label="From"
                margin="dense"
                onChange={this.handleEmailSenderChange}
                required
              />

              <TextField
                name="to"
                value={recipient}
                label="To"
                margin="dense"
                onChange={this.handleEmailRecipientChange}
                required
              />

              <TextField
                name="subject"
                value={subject}
                label="Subject"
                margin="dense"
                onChange={this.handleEmailSubjectChange}
                required
              />

              <TextField
                name="body"
                value={body}
                label="Body"
                margin="dense"
                onChange={this.handleEmailBodyChange}
                required
                multiline
              />
            </EditorContent>
            <EditorButtons
              createAction={this.handleCreateOrUpdateBusiness}
              updateAction={this.handleCreateOrUpdateBusiness}
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
  transactionId: PropTypes.number
};

export default withStyles(EmailStyle)(Email);
