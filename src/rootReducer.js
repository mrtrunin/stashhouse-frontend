import { combineReducers } from "redux";
import transaction from "pages/Transaction/TransactionReducer";
import auth from "pages/Login/AuthReducer";
import user from "pages/Login/UserReducer";
import customer from "pages/Customer/CustomerReducer";
import customers from "pages/Customers/CustomersReducer";
import emails from "components/Email/EmailsReducer";
import warehouse from "pages/Warehouse/WarehouseReducer";
import warehouses from "pages/Warehouses/WarehousesReducer";
import product from "pages/Product/ProductReducer";
import products from "pages/Products/ProductsReducer";
import payment from "pages/Payment/PaymentReducer";
import payments from "pages/Payments/PaymentsReducer";
import transactionState from "pages/Transaction/TransactionStateReducer";
import { transactions } from "pages/Transactions/TransactionsReducer";
import business from "pages/Business/BusinessReducer";
import businesses from "pages/Businesses/BusinessesReducer";
import message from "components/Message/MessageReducer";
import { USER_LOGOUT } from "pages/Logout/LogoutActions";

const appReducer = combineReducers({
  auth,
  user,
  emails,
  business,
  businesses,
  transaction,
  transactions,
  customer,
  customers,
  warehouse,
  warehouses,
  payment,
  payments,
  product,
  products,
  transactionState,
  message
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
