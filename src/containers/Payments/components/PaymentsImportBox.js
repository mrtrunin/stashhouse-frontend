import React, { Component } from "react";
import PropTypes from "prop-types";
import { Paper, FormControl, withStyles, Button } from "@material-ui/core";
import { PaymentsImportBoxStyle } from "./PaymentsImportBoxStyle";

class PaymentsImportBox extends Component {
  static propTypes = {
    prop: PropTypes
  };

  handleImport = () => {};

  render() {
    const { classes } = this.props;

    return (
      <Paper>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <Button variant="raised" color="primary" onClick={this.handleImport}>
            Import Statement
          </Button>
        </FormControl>
      </Paper>
    );
  }
}

PaymentsImportBox.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(PaymentsImportBoxStyle)(PaymentsImportBox);
