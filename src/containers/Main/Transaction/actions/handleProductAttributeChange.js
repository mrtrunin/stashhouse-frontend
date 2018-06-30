import store from "store";

const handleProductAttributeChange = (productId, e) => {
  let id = parseInt(productId ? productId : e.target.id, 10);

  store.dispatch({
    type: "TRANSACTION_STATE_CHANGE_PRODUCT_ATTRIBUTE",
    id: id,
    [e.target.name]: ["price", "tax_rate"].includes(e.target.name)
      ? parseFloat(e.target.value)
      : parseInt(e.target.value, 10)
  });
};

handleProductAttributeChange.propTypes = {};

export default handleProductAttributeChange;
