import { combineReducers } from "redux";
import transaction from "containers/Transaction/TransactionReducer";
import auth from "containers/Login/AuthReducer";
import user from "containers/Login/UserReducer";
import customer from "containers/Customer/CustomerReducer";
import customers from "containers/Customers/CustomersReducer";
import warehouse from "containers/Warehouse/WarehouseReducer";
import warehouses from "containers/Warehouses/WarehousesReducer";
import product from "containers/Product/ProductReducer";
import products from "containers/Products/ProductsReducer";
import payment from "reducers/PaymentReducer";
import payments from "containers/Payments/PaymentsReducer";
import transactionState from "containers/Transaction/TransactionStateReducer";
import { transactions } from "containers/Transactions/TransactionsReducer";
import invoices from "reducers/InvoicesReducer";
import snackBarMessage from "reducers/SnackBarMessageReducer";
import business from "containers/Business/BusinessReducer";
import businesses from "containers/Businesses/BusinessesReducer";
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
  snackBarMessage
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
