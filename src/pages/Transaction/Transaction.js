import React, { useState, useEffect } from "react";
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
import { bindActionCreators } from "redux";
import InvoiceDaysDue from "./components/InvoiceDaysDue";

export const style = theme => ({
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

const Transaction = props => {
  const {
    business,
    customersFetched,
    warehousesFetched,
    productsFetched,
    transactionState,
    customers,
    warehouses,
    products,
    classes,
    actions: {
      fetchCustomers,
      fetchWarehouses,
      fetchProducts,
      resetTransaction,
      deleteTransaction,
      createTransaction,
      updateTransaction,
      removeProduct,
      selectWarehouse,
      selectCustomer,
      calculateTotals,
      updateInvoiceDaysDue,
      updateProductAttribute,
      selectProduct,
      loadExistingTransaction,
      setTransactionType
    }
  } = props;

  const transactionId = props.match.params.transactionId;

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setStartingPosition();
  }, [business, transactionId]);

  const setStartingPosition = async () => {
    await resetTransaction();
    await fetchCustomers(business.name);
    await fetchWarehouses(business.name);
    await fetchProducts(business.name);
    await loadExistingTransaction(
      customers,
      warehouses,
      products,
      transactionId
    );
    await setTransactionType(props.match.params.transactionType);
  };

  const totals = calculateTotals(transactionState);

  const existingTransactionId = props.match.params.transactionId;
  const isExistingTransaction = existingTransactionId ? true : false;
  const transactionType = transactionState.transactionType;
  const fromWarehouseAllowed = ["sell", "move", "writeoff"].includes(
    transactionType
  );
  const toWarehouseAllowed = ["buy", "move"].includes(transactionType);
  const invoiceDaysAllowed = ["sell"].includes(transactionType);
  const taxAllowed = ["sell", "buy"].includes(transactionType);
  const totalWithTaxAllowed = ["sell", "buy"].includes(transactionType);
  const customersRequired = ["sell"].includes(transactionType);

  if (redirect) {
    return <Redirect to="/transactions" />;
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
                onChange={e => selectCustomer(customers, e.target.value)}
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
                onChange={e =>
                  selectWarehouse("FROM", warehouses, e.target.value)
                }
              />
            )}

            {toWarehouseAllowed && warehousesFetched && (
              <WarehouseSelector
                label="To Warehouse"
                warehouses={warehouses}
                defaultValue="Select To Warehouse"
                selectedWarehouse={transactionState.toWarehouse}
                onChange={e =>
                  selectWarehouse("TO", warehouses, e.target.value)
                }
              />
            )}

            {invoiceDaysAllowed && (
              <InvoiceDaysDue
                value={transactionState.daysDue}
                onChange={e => updateInvoiceDaysDue(e.target.value)}
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
                onProductChange={e => selectProduct(products, e.target.value)}
                onProductAttributeChange={updateProductAttribute}
                onProductRemove={removeProduct}
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
                  onClick={() => {
                    deleteTransaction(existingTransactionId);
                    setRedirect(true);
                  }}
                >
                  Delete
                </Button>
              </Grid>
            ) : (
              <Grid item className={classes.flex}>
                <Button
                  color="default"
                  variant="contained"
                  onClick={resetTransaction}
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
                  onClick={() => {
                    updateTransaction(transactionState, business);
                    setRedirect(true);
                  }}
                >
                  Update
                </Button>
              </Grid>
            ) : (
              <Grid item className={classes.button}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    createTransaction(transactionState, business);
                    setRedirect(true);
                  }}
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
};

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
)(withStyles(style)(Transaction));
