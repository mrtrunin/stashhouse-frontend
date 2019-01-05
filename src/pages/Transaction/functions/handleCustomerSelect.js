import store from "store";

const handleCustomerSelect = (customers, e) => {
  let selectedCustomer = customers.filter(customer => {
    return customer.name === e.target.value;
  })[0];

  store.dispatch({
    type: "TRANSACTION_STATE_CHANGE_CUSTOMER",
    payload: selectedCustomer
  });

  store.dispatch({
    type: "TRANSACTION_STATE_CHANGE_DAYS_DUE",
    payload: selectedCustomer.default_days_due
  });

  store.dispatch({
    type: "TRANSACTION_STATE_CHANGE_FROM_WAREHOUSE",
    payload: selectedCustomer.default_warehouse
  });
};

handleCustomerSelect.propTypes = {};

export default handleCustomerSelect;
