import store from "store";

const handleCustomerSelect = (customers, e) => {
  let selectedCustomer = customers.filter(customer => {
    return customer.name === e.target.value;
  })[0];

  store.dispatch({
    type: "TRANSACTION_STATE_CHANGE_CUSTOMER",
    payload: selectedCustomer
  });
};

handleCustomerSelect.propTypes = {};

export default handleCustomerSelect;
