import store from "store";

const handleProductRemove = (productId, e) => {
  e.preventDefault();
  store.dispatch({
    type: "TRANSACTION_STATE_REMOVE_PRODUCT",
    id: parseInt(productId, 10)
  });
};

handleProductRemove.propTypes = {};

export default handleProductRemove;
