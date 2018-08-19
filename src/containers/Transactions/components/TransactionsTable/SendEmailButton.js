import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const SendEmailButton = props => {
  const { onClick, transaction } = props;
  const transactionId = transaction.id;

  return (
    <Button
      variant="raised"
      color="default"
      onClick={onClick.bind(props, transactionId)}
      size="small"
    >
      <span id={transactionId} name="email">
        <div name="email" />
        Email
      </span>
    </Button>
  );
};

SendEmailButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired
};

export default SendEmailButton;
