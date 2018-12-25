import React from "react";
import PropTypes from "prop-types";
import { FormControl, InputLabel, Select, Input } from "@material-ui/core";

const SelectInvoice = props => {
  const { payment, invoicesList, onChange } = props;

  return (
    <FormControl>
      <InputLabel htmlFor="transaction">Invoice</InputLabel>
      <Select
        value={payment.transaction ? payment.transaction : ""}
        onChange={onChange}
        name="transaction"
        renderValue={value => value}
        input={<Input id="transaction" />}
      >
        {invoicesList}
      </Select>
    </FormControl>
  );
};

SelectInvoice.propTypes = {
  payment: PropTypes.object.isRequired,
  invoicesList: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default SelectInvoice;
