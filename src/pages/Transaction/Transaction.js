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
import CustomerSelector from "./components/CustomerSelector";
import WarehouseSelector from "./components/WarehouseSelector";
import TransactionProductTable from "./components/TransactionProductTable";
import GrandTotalCalculator from "./components/GrandTotalCalculator";

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
import handleInvoiceDaysDueChange from "./functions/handleInvoiceDaysDueChange";
import { bindActionCreators } from "redux";

import { TransactionStyle } from "./TransactionStyle";
import InvoiceDaysDue from "./components/InvoiceDaysDue";

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
    } = await this.props;
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
      },
      customersFetched,
      warehousesFetched,
      productsFetched,
      transactionState,
      customers,
      warehouses,
      products,
      business
    } = this.props;

    const { redirect } = this.state;

    const totals = calculateTotals(transactionState);

    const existingTransactionId = this.props.match.params.transactionId;
    const isExistingTransaction = existingTransactionId ? true : false;

    const transactionType = transactionState.transactionType;
    const fromWarehouseAllowed = ["sell", "move"].includes(transactionType);
    const toWarehouseAllowed = ["buy", "move"].includes(transactionType);
    const invoiceDaysAllowed = ["sell"].includes(transactionType);
    const taxAllowed = ["sell", "buy"].includes(transactionType);
    const totalWithTaxAllowed = ["sell", "buy"].includes(transactionType);

    const customersRequired = ["sell"].includes(transactionType);

    if (redirect) {
      return <Redirect to="/transactions/" />;
    }

    return (
      <form>
        <Grid container spacing={16} className={classes.topAttributes}>
          <Grid item xs={12}>
            <Grid container>
              {customersRequired && customersFetched && (
                <CustomerSelector
                  customers={customers}
                  selectedCustomer={transactionState.customer}
                  onChange={handleCustomerSelect.bind(null, customers)}
                  customersRequired={customersRequired}
                  customersFetched={customersFetched}
                />
              )}

              {fromWarehouseAllowed && warehousesFetched && (
                <WarehouseSelector
                  label="From Warehouse"
                  warehouses={warehouses}
                  defaultValue="Select From Warehouse"
                  selectedWarehouse={transactionState.fromWarehouse}
                  onChange={handleWarehouseSelect.bind(
                    null,
                    "FROM",
                    warehouses
                  )}
                />
              )}

              {toWarehouseAllowed && warehousesFetched && (
                <WarehouseSelector
                  label="To Warehouse"
                  warehouses={warehouses}
                  defaultValue="Select To Warehouse"
                  selectedWarehouse={transactionState.toWarehouse}
                  onChange={handleWarehouseSelect.bind(null, "TO", warehouses)}
                />
              )}

              {invoiceDaysAllowed && (
                <InvoiceDaysDue
                  value={transactionState.daysDue}
                  onChange={handleInvoiceDaysDueChange}
                />
              )}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Paper className={classes.table}>
              {productsFetched && (
                <TransactionProductTable
                  products={products}
                  selectedProducts={transactionState.products}
                  onProductChange={handleProductSelect.bind(null, products)}
                  onProductAttributeChange={handleProductAttributeChange}
                  onProductRemove={handleProductRemove}
                />
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
                      transactionState,
                      business,
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
                      transactionState,
                      business,
                      createTransaction,
                      addProductToTransaction
                    )}
                  >
                    {transactionState.transactionType}
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
