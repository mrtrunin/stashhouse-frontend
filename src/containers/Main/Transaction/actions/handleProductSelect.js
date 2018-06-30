import store from "store";
import transformSelectedProduct from "./transformSelectedProduct";

const handleProductSelect = (products, e) => {
  let selectedProduct = products.find(product => {
    return product.name === e.target.value;
  });

  selectedProduct = transformSelectedProduct(selectedProduct);

  store.dispatch({
    type: "TRANSACTION_STATE_ADD_PRODUCT",
    payload: selectedProduct
  });
};

handleProductSelect.propTypes = {};

export default handleProductSelect;
