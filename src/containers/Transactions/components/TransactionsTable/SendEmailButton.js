import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

const SendEmailButton = props => {
  const { onClick, transaction } = props;

  return (
    <Button
      variant="contained"
      color="default"
      onClick={onClick.bind(props, transaction)}
      size="small"
    >
      <span id={transaction.id} name="email">
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
