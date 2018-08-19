import React from "react";
import PropTypes from "prop-types";
import { addCommas } from "services/functions";
import { TableRow, TableCell } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Remove from "@material-ui/icons/Remove";
import {
  FormControl,
  MenuItem,
  Select,
  Input,
  TextField
} from "@material-ui/core";

const ProductRowInTable = props => {
  let productName = props.product.name;
  let ean = props.product.ean;
  let quantity = props.product.quantity;
  let price = props.product.price
    ? props.product.price
    : props.product.default_price;
  let total_without_tax = price * quantity;
  let tax_rate = props.product.tax_rate;
  let total_with_tax = total_without_tax + total_without_tax * tax_rate;

  let showProductRemoveButton = props.showProductRemoveButton;
  let showTaxRate = props.showTaxRate;
  let showTotalWithTax = props.showTotalWithTax;
  let showEAN = props.showEAN;

  return (
    <TableRow>
      {showProductRemoveButton && (
        <TableCell padding="none" numeric>
          <Button
            mini
            color="default"
            variant="fab"
            aria-label="remove"
            onClick={props.onClick.bind(props, props.id)}
          >
            <Remove id={props.id} />
          </Button>
        </TableCell>
      )}
      <TableCell name="Product Name" padding="dense">
        {productName}
      </TableCell>
      {showEAN && <TableCell>{ean}</TableCell>}
      <TableCell name="Quantity" padding="dense">
        <TextField
          name="quantity"
          defaultValue={quantity}
          onChange={props.onChange.bind(null, props.id.toString())}
          style={{ width: 80 }}
        />
      </TableCell>
      <TableCell name="Price" padding="dense">
        <TextField
          name="price"
          defaultValue={price.toFixed(2)}
          onChange={props.onChange.bind(null, props.id.toString())}
          style={{ width: 80 }}
        />
      </TableCell>
      <TableCell name="Total without tax" numeric padding="dense">
        <strong>{addCommas(total_without_tax.toFixed(2))}</strong>
      </TableCell>
      {showTaxRate && (
        <TableCell name="Tax rate" numeric padding="dense">
          <FormControl>
            <Select
              value={tax_rate ? tax_rate : "0"}
              onChange={props.onChange.bind(null, props.id.toString())}
              name="tax_rate"
              renderValue={value => (value * 100).toString() + "%"}
              input={<Input id="tax_rate" />}
            >
              <MenuItem value={(0.0).toString()}>0%</MenuItem>
              <MenuItem value={0.09}>9%</MenuItem>
              <MenuItem value={0.2}>20%</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
      )}
      {showTotalWithTax && (
        <TableCell name="Total with tax" numeric padding="dense">
          {addCommas(total_with_tax.toFixed(2))}
        </TableCell>
      )}
    </TableRow>
  );
};

ProductRowInTable.propTypes = {
  product: PropTypes.object,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  id: PropTypes.number,

  showProductRemoveButton: PropTypes.bool.isRequired,
  showTaxRate: PropTypes.bool.isRequired,
  showTotalWithTax: PropTypes.bool.isRequired,
  showEAN: PropTypes.bool
};

export default ProductRowInTable;
