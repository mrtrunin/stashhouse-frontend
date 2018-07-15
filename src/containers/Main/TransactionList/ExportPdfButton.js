import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

const ExportPdfButton = props => {
  const { transaction, onClick } = props;
  let transactionId = transaction.id;
  let transactionName = transaction.full_transaction_number;

  return (
    <Button
      variant="raised"
      color="default"
      onClick={onClick.bind(props, transactionId, transactionName)}
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
