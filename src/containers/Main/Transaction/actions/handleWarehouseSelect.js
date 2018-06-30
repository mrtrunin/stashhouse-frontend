import store from "store";
import PropTypes from "prop-types";

const handleWarehouseSelect = (direction, warehouses, e) => {
  let dispatchTypeByDirection = {
    FROM: "TRANSACTION_STATE_CHANGE_FROM_WAREHOUSE",
    TO: "TRANSACTION_STATE_CHANGE_TO_WAREHOUSE"
  };

  let selectedWarehouse = warehouses.filter(warehouse => {
    return warehouse.name === e.target.value;
  });

  store.dispatch({
    type: dispatchTypeByDirection[direction],
    payload: selectedWarehouse[0]
  });
};

handleWarehouseSelect.propTypes = {
  direction: PropTypes.string
};

export default handleWarehouseSelect;
