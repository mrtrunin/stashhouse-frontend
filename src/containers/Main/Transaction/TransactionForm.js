import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Material UI components
import { withStyles, Grid, Paper, Button } from "@material-ui/core";

// API calls
import fetchMerchants from "api/fetchMerchants";
import fetchWarehouses from "api/fetchWarehouses";
import fetchProducts from "api/fetchProducts";

// Stashhouse components
import MerchantSelector from "components/Selectors/MerchantSelector";
import WarehouseSelector from "components/Selectors/WarehouseSelector";
import TransactionProductTable from "components/Tables/TransactionProductTable";
import GrandTotalCalculator from "components/Calculators/GrandTotalCalculator";

// TransactionForm actions
import calculateTotals from "./actions/calculateTotals";
import setTransactionType from "./actions/setTransactionType";
import handleMerchantSelect from "./actions/handleMerchantSelect";
import handleWarehouseSelect from "./actions/handleWarehouseSelect";
import handleProductSelect from "./actions/handleProductSelect";
import handleProductAttributeChange from "./actions/handleProductAttributeChange";
import handleProductRemove from "./actions/handleProductRemove";
import handleReset from "./actions/handleReset";
import handleDelete from "./actions/handleDelete";
import handleCreateTransaction from "./actions/handleCreateTransaction";
import loadExistingTransaction from "./actions/loadExistingTransaction";
import handleUpdateTransaction from "./actions/handleUpdateTransaction";

const styles = theme => ({
  topAttributes: {
    marginTop: theme.spacing.unit
  },
  table: {
    width: "100%",
    overflowX: "hidden"
  },
  grandTotalCalculator: {
    padding: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 3
  },
  flex: {
    flex: 1,
    padding: theme.spacing.unit * 2
  },
  button: {
    padding: theme.spacing.unit * 2
  }
});

export class TransactionForm extends Component {
  state = {
    redirect: false
  };

  componentDidMount = async () => {
    const { business } = this.props;
    await fetchMerchants(business.name);
    await fetchWarehouses(business.name);
    await fetchProducts(business.name);
    await loadExistingTransaction(this.props, this.redirect);
    await setTransactionType(this.props.match.params.transactionType);
  };

  redirect = () => {
    this.setState({ redirect: true });
  };

  render() {
    const { classes } = this.props;

    let merchantsFetched = this.props.merchantsFetched;
    let warehousesFetched = this.props.warehousesFetched;
    let productsFetched = this.props.productsFetched;

    let totals = calculateTotals(this.props.transactionState);

    let existingTransactionId = this.props.match.params.transactionId;
    let isExistingTransaction = existingTransactionId ? true : false;

    let transactionType = this.props.transactionState.transactionType;
    let fromWarehouseAllowed = ["sell", "move"].includes(transactionType);
    let toWarehouseAllowed = ["buy", "move"].includes(transactionType);
    let taxAllowed = ["sell", "buy"].includes(transactionType);
    let totalWithTaxAllowed = ["sell", "buy"].includes(transactionType);

    let merchantRequired = ["sell"].includes(transactionType);

    if (this.state.redirect) {
      return <Redirect to="/transaction-list/" />;
    }

    return (
      <form>
        <Grid container spacing={16} className={classes.topAttributes}>
          <Grid item xs={12}>
            <Grid container>
              {merchantRequired && (
                <Grid item xs={4}>
                  {merchantsFetched ? (
                    <MerchantSelector
                      className="col s3"
                      merchants={this.props.merchants}
                      selectedMerchant={this.props.transactionState.merchant}
                      onChange={handleMerchantSelect.bind(
                        null,
                        this.props.merchants
                      )}
                    />
                  ) : (
                    "Loading"
                  )}
                </Grid>
              )}

              {fromWarehouseAllowed && (
                <Grid item xs={4}>
                  {warehousesFetched ? (
                    <WarehouseSelector
                      label="From Warehouse"
                      warehouses={this.props.warehouses}
                      defaultValue="Select From Warehouse"
                      selectedWarehouse={
                        this.props.transactionState.fromWarehouse
                      }
                      onChange={handleWarehouseSelect.bind(
                        null,
                        "FROM",
                        this.props.warehouses
                      )}
                    />
                  ) : (
                    "Loading"
                  )}
                </Grid>
              )}

              {toWarehouseAllowed && (
                <Grid item xs={4}>
                  {warehousesFetched ? (
                    <WarehouseSelector
                      label="To Warehouse"
                      warehouses={this.props.warehouses}
                      defaultValue="Select To Warehouse"
                      selectedWarehouse={
                        this.props.transactionState.toWarehouse
                      }
                      onChange={handleWarehouseSelect.bind(
                        null,
                        "TO",
                        this.props.warehouses
                      )}
                    />
                  ) : (
                    "Loading"
                  )}
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.table}>
              {productsFetched ? (
                <TransactionProductTable
                  products={this.props.products}
                  selectedProducts={this.props.transactionState.products}
                  onProductChange={handleProductSelect.bind(
                    null,
                    this.props.products
                  )}
                  onProductAttributeChange={handleProductAttributeChange}
                  onProductRemove={handleProductRemove}
                />
              ) : (
                "Loading"
              )}

              <Grid container className={classes.grandTotalCalculator}>
                <Grid item xs={8} />
                <Grid item xs={4}>
                  <GrandTotalCalculator
                    totalWithoutTax={totals.total_without_tax}
                    tax={taxAllowed && totals.tax}
                    totalWithTax={totalWithTaxAllowed && totals.total_with_tax}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Grid container>
              {isExistingTransaction ? (
                <Grid item className={classes.flex}>
                  <Button
                    color="secondary"
                    variant="raised"
                    onClick={handleDelete.bind(
                      null,
                      existingTransactionId,
                      this.redirect
                    )}
                  >
                    Delete
                  </Button>
                </Grid>
              ) : (
                <Grid item className={classes.flex}>
                  <Button
                    color="default"
                    variant="raised"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Grid>
              )}

              {isExistingTransaction ? (
                <Grid item className={classes.button}>
                  <Button
                    color="primary"
                    variant="raised"
                    onClick={handleUpdateTransaction.bind(
                      null,
                      this.props.transactionState,
                      this.props.business
                    )}
                  >
                    Update
                  </Button>
                </Grid>
              ) : (
                <Grid item className={classes.button}>
                  <Button
                    color="primary"
                    variant="raised"
                    onClick={handleCreateTransaction.bind(
                      null,
                      this.props.transactionState,
                      this.props.business
                    )}
                  >
                    {this.props.transactionState.transactionType}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }
}

TransactionForm.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  merchants: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  warehouses: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  products: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  merchantsFetched: PropTypes.bool,
  warehousesFetched: PropTypes.bool,
  productsFetched: PropTypes.bool,
  transactionState: PropTypes.object,
  business: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      transactionType: PropTypes.string.isRequired,
      transactionId: PropTypes.string
    })
  })
};

export default connect(store => {
  return {
    merchants: store.merchants.merchants,
    merchantsFetched: store.merchants.fetched,
    warehouses: store.warehouses.warehouses,
    warehousesFetched: store.warehouses.fetched,
    products: store.products.products,
    productsFetched: store.products.fetched,
    transactionState: store.transactionState,
    business: store.user.business
  };
})(withStyles(styles)(TransactionForm));
