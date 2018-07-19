import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import transaction from "./TransactionReducer";
import user from "./UserReducer";
import merchant from "./MerchantReducer";
import merchants from "./MerchantsReducer";
import warehouse from "./WarehouseReducer";
import warehouses from "./WarehousesReducer";
import product from "./ProductReducer";
import products from "./ProductsReducer";
import payment from "./PaymentReducer";
import payments from "./PaymentsReducer";
import transactionState from "./TransactionStateReducer";
import transactions from "./TransactionsReducer";
import invoices from "./InvoicesReducer";
import productsStock from "./ProductsStockReducer";
import snackBarMessage from "./SnackBarMessageReducer";
import business from "./BusinessReducer";
import businesses from "./BusinessesReducer";

const appReducer = combineReducers({
  user,
  business,
  businesses,
  transaction,
  transactions,
  invoices,
  merchant,
  merchants,
  warehouse,
  warehouses,
  payment,
  payments,
  product,
  products,
  transactionState,
  productsStock,
  snackBarMessage,
  form: formReducer
});

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
