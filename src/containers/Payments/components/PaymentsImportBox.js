import React, { Component } from "react";
import PropTypes from "prop-types";
import { Paper, FormControl, withStyles, Button } from "@material-ui/core";
import { PaymentsImportBoxStyle } from "./PaymentsImportBoxStyle";
import { bindActionCreators } from "redux";
import * as actions from "../PaymentsActions";
import { connect } from "react-redux";

class PaymentsImportBox extends Component {
  static propTypes = {
    prop: PropTypes
  };

  handleImport = async e => {
    const statementFile = e.target.files[0];
    const {
      business,
      actions: { importStatement, fetchPayments }
    } = this.props;
    await importStatement(statementFile, business.name);
    await fetchPayments(business.name);
  };

  render() {
    const { classes } = this.props;

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
            onChange={this.handleImport}
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
  }
}

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
