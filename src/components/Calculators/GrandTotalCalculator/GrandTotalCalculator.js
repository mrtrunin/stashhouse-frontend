import React from "react";
import PropTypes from "prop-types";
import addCommas from "functions/addCommas";
import { Grid } from "@material-ui/core";

const GrandTotalCalculator = props => {
  let total_without_tax = props.totalWithoutTax;
  let tax = props.tax;
  let total_with_tax = props.totalWithTax;
  return (
    <Grid container style={{ fontSize: 16, textAlign: "right" }}>
      {total_without_tax > 0 && (
        <Grid container>
          <Grid item xs={6}>
            Total without tax:
          </Grid>
          <Grid item xs={4}>
            {addCommas(total_without_tax.toFixed(2))}
          </Grid>
        </Grid>
      )}
      {tax > 0 && (
        <Grid container>
          <Grid item xs={6}>
            Tax:
          </Grid>
          <Grid item xs={4}>
            {addCommas(tax.toFixed(2))}
          </Grid>
        </Grid>
      )}
      {total_with_tax > 0 && (
        <Grid container>
          <Grid item xs={6}>
            <strong>Total with tax:</strong>
          </Grid>
          <Grid item xs={4}>
            <strong>{addCommas(total_with_tax.toFixed(2))}</strong>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

GrandTotalCalculator.propTypes = {
  totalWithoutTax: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  tax: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  totalWithTax: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
};

export default GrandTotalCalculator;
