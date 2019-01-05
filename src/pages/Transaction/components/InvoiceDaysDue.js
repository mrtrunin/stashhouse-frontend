import React from "react";
import PropTypes from "prop-types";
import { Grid, FormControl, TextField } from "@material-ui/core";

const InvoiceDaysDue = ({ value, onChange }) => {
  return (
    <Grid item xs={4}>
      <FormControl>
        <TextField
          label="Days Due"
          value={value ? value : ""}
          onChange={onChange}
        />
      </FormControl>
    </Grid>
  );
};

InvoiceDaysDue.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func
};

export default InvoiceDaysDue;
