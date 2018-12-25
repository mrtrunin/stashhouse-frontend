import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Material UI components
import { withStyles, Grid, Paper, Button } from "@material-ui/core";

// API calls
import * as customersActions from "pages/Customers/CustomersActions";
import * as warehousesActions from "pages/Warehouses/WarehousesActions";
import * as transactionActions from "pages/Transaction/TransactionActions";
import * as productsActions from "pages/Products/ProductsActions";

// Stashhouse components
import CustomerSelector from "components/Selectors/CustomerSelector";
import WarehouseSelector from "components/Selectors/WarehouseSelector";
import TransactionProductTable from "components/Tables/TransactionProductTable";
import GrandTotalCalculator from "components/Calculators/GrandTotalCalculator";

// Transaction functions
import calculateTotals from "./functions/calculateTotals";
import setTransactionType from "./functions/setTransactionType";
import handleCustomerSelect from "./functions/handleCustomerSelect";
import handleWarehouseSelect from "./functions/handleWarehouseSelect";
import handleProductSelect from "./functions/handleProductSelect";
import handleProductAttributeChange from "./functions/handleProductAttributeChange";
import handleProductRemove from "./functions/handleProductRemove";
import handleReset from "./functions/handleReset";
import handleDelete from "./functions/handleDelete";
import handleCreateTransaction from "./functions/handleCreateTransaction";
import loadExistingTransaction from "./functions/loadExistingTransaction";
import handleUpdateTransaction from "./functions/handleUpdateTransaction";
import { bindActionCreators } from "redux";

import { TransactionStyle } from "./TransactionStyle";

export class Transaction extends Component {
  state = {
    redirect: false
  };

  componentDidMount = async () => {
    const {
      business,
      actions: {
        fetchCustomers,
        fetchWarehouses,
        fetchTransaction,
        fetchProducts,
        fetchStock,
        resetTransaction
      }
    } = this.props;
    await resetTransaction();
    await fetchCustomers(business.name);
    await fetchWarehouses(business.name);
    await fetchProducts(business.name);
    await loadExistingTransaction(
      this.props,
      this.redirect,
      fetchTransaction,
      fetchStock
    );
    await setTransactionType(this.props.match.params.transactionType);
  };

  redirect = () => {
    this.setState({ redirect: true });
  };

  render() {
    const {
      classes,
      actions: {
        deleteTransaction,
        createTransaction,
        updateTransaction,
        addProductToTransaction,
        deleteStockFromTransaction
      }
    } = this.props;

    let customersFetched = this.props.customersFetched;
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

    let customerRequired = ["sell"].includes(transactionType);

    if (this.state.redirect) {
      return <Redirect to="/transactions/" />;
    }

    return (
      <form>
        <Grid container spacing={16} className={classes.topAttributes}>
          <Grid item xs={12}>
            <Grid container>
              {customerRequired && (
                <Grid item xs={4}>
                  {customersFetched ? (
                    <CustomerSelector
                      className="col s3"
                      customers={this.props.customers}
                      selectedCustomer={this.props.transactionState.customer}
                      onChange={handleCustomerSelect.bind(
                        null,
                        this.props.customers
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
                    variant="contained"
                    onClick={handleDelete.bind(
                      null,
                      existingTransactionId,
                      this.redirect,
                      deleteTransaction
                    )}
                  >
                    Delete
                  </Button>
                </Grid>
              ) : (
                <Grid item className={classes.flex}>
                  <Button
                    color="default"
                    variant="contained"
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
                    variant="contained"
                    onClick={handleUpdateTransaction.bind(
                      null,
                      this.props.transactionState,
                      this.props.business,
                      updateTransaction,
                      addProductToTransaction,
                      deleteStockFromTransaction
                    )}
                  >
                    Update
                  </Button>
                </Grid>
              ) : (
                <Grid item className={classes.button}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={handleCreateTransaction.bind(
                      null,
                      this.props.transactionState,
                      this.props.business,
                      createTransaction,
                      addProductToTransaction
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

Transaction.propTypes = {
  actions: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  customers: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  warehouses: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  products: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  customersFetched: PropTypes.bool,
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

const mapStateToProps = state => {
  return {
    customers: state.customers.customers,
    customersFetched: state.customers.fetched,
    warehouses: state.warehouses.warehouses,
    warehousesFetched: state.warehouses.fetched,
    products: state.products.products,
    productsFetched: state.products.fetched,
    transactionState: state.transactionState,
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...customersActions,
        ...warehousesActions,
        ...transactionActions,
        ...productsActions
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(TransactionStyle)(Transaction));
