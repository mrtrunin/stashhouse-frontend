import React from "react";
import PropTypes from "prop-types";
import SendEmailButton from "./SendEmailButton";

const ShowCounterOrSendEmailButton = ({ transaction, handleOpenEmail }) => {
  const emailList = transaction.sent_emails;
  const successfulEmailCount = emailList.filter(
    email => email.status === "SENT"
  ).length;
  const sentEmailCount = emailList.length;

  if (sentEmailCount > 0 && successfulEmailCount !== sentEmailCount) {
    return `${successfulEmailCount}/${sentEmailCount}`;
  }

  if (sentEmailCount > 0) {
    return sentEmailCount;
  }

  return (
    <SendEmailButton transaction={transaction} onClick={handleOpenEmail} />
  );
};

ShowCounterOrSendEmailButton.propTypes = {
  transaction: PropTypes.object.isRequired,
  handleOpenEmail: PropTypes.func.isRequired
};

export default ShowCounterOrSendEmailButton;
