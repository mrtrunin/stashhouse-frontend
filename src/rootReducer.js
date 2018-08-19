import { combineReducers } from "redux";
import transaction from "containers/Transaction/TransactionReducer";
import auth from "containers/Login/AuthReducer";
import user from "containers/Login/UserReducer";
import customer from "reducers/CustomerReducer";
import customers from "containers/Customers/CustomersReducer";
import warehouse from "containers/Warehouse/WarehouseReducer";
import warehouses from "containers/Warehouse/WarehousesReducer";
import product from "reducers/ProductReducer";
import products from "reducers/ProductsReducer";
import payment from "reducers/PaymentReducer";
import payments from "reducers/PaymentsReducer";
import transactionState from "containers/Transaction/TransactionStateReducer";
import { transactions } from "containers/Transactions/TransactionsReducer";
import invoices from "reducers/InvoicesReducer";
import productsStock from "reducers/ProductsStockReducer";
import snackBarMessage from "reducers/SnackBarMessageReducer";
import business from "reducers/BusinessReducer";
import businesses from "reducers/BusinessesReducer";
import { USER_LOGOUT } from "containers/Logout/LogoutActions";

const appReducer = combineReducers({
  auth,
  user,
  business,
  businesses,
  transaction,
  transactions,
  invoices,
  customer,
  customers,
  warehouse,
  warehouses,
  payment,
  payments,
  product,
  products,
  transactionState,
  productsStock,
  snackBarMessage
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;