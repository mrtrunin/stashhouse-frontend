import React from "react";
import PropTypes from "prop-types";
import SendEmailButton from "./SendEmailButton";
import { Link } from "react-router-dom";
import { Typography, withStyles } from "@material-ui/core";
import { red800 } from "material-ui/styles/colors";
import { black } from "material-ui/styles/colors";

export const ShowCounterOrSendEmailButtonStyles = theme => ({
  sentEmails: {
    color: black
  },
  failedEmails: {
    color: red800
  }
});

const ShowCounterOrSendEmailButton = ({
  transaction,
  handleOpenEmail,
  classes
}) => {
  const emailList = transaction.sent_emails;
  const successfulEmailCount = emailList.filter(
    email => email.status === "SENT"
  ).length;
  const emailCount = emailList.length;
  const failedEmailCount = emailList.filter(email => email.status === "FAILED")
    .length;
  const linkTarget = "/emails";

  if (emailCount > 0) {
    return (
      <Typography
        align="center"
        noWrap
        style={{
          textDecoration: "none",
          display: "inline",
          fontSize: "1em"
        }}
        component={Link}
        to={linkTarget + "/" + transaction.id}
      >
        <span className={classes.sentEmails}>{successfulEmailCount} sent</span>
        {failedEmailCount >= 0 && (
          <span className={classes.failedEmails}>
            , {failedEmailCount} failed
          </span>
        )}
      </Typography>
    );
  }
  return (
    <SendEmailButton transaction={transaction} onClick={handleOpenEmail} />
  );
};

ShowCounterOrSendEmailButton.propTypes = {
  classes: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  handleOpenEmail: PropTypes.func.isRequired
};

export default withStyles(ShowCounterOrSendEmailButtonStyles)(
  ShowCounterOrSendEmailButton
);
