import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const ExportPdfButton = props => {
  let transactionId = props.transaction.id;
  let transactionName = props.transaction.full_transaction_number;

  return (
    <Button
      variant="raised"
      color="default"
      onClick={props.onClick.bind(props, transactionId, transactionName)}
      size="small"
    >
      <span id={transactionId} name="hello">
        <div name="hello" />
        PDF
      </span>
    </Button>
  );
};

ExportPdfButton.propTypes = {
  onClick: PropTypes.func,
  transaction: PropTypes.object.isRequired
};

export default ExportPdfButton;
