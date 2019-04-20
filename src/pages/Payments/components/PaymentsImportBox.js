import React from "react";
import PropTypes from "prop-types";
import { Paper, FormControl, withStyles, Button } from "@material-ui/core";
import { PaymentsImportBoxStyle } from "./PaymentsImportBoxStyle";
import { bindActionCreators } from "redux";
import * as actions from "../PaymentsActions";
import { connect } from "react-redux";

const PaymentsImportBox = ({
  business,
  classes,
  actions: { importStatement, fetchPayments }
}) => {
  const handleImport = async e => {
    const statementFile = e.target.files[0];

    await importStatement(statementFile, business.name);
    await fetchPayments(business.name);
  };

  return (
    <Paper>
      <FormControl
        component="fieldset"
        required
        className={classes.formControl}
      >
        <input
          accept=".csv"
          className={classes.input}
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handleImport}
          key={new Date().getTime()} // This resets the importer, allowing you to import the same file twice. Perhaps not needed?
        />
        <label htmlFor="raised-button-file">
          <Button
            variant="contained"
            color="primary"
            component="span"
            className={classes.button}
          >
            Import Statement
          </Button>
        </label>
      </FormControl>
    </Paper>
  );
};

PaymentsImportBox.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  business: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    payments: state.payments.payments,
    fetched: state.payments.fetched,
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(PaymentsImportBoxStyle)(PaymentsImportBox));
