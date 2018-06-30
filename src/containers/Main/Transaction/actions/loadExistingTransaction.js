import PropTypes from "prop-types";
import fetchTransaction from "api/Transaction/fetchTransaction";
import fetchStock from "api/fetchStock";
import store from "store";
import transformSelectedProduct from "./transformSelectedProduct";
import Message from "components/Message";

const loadExistingTransaction = async (props, redirect) => {
  let transactionId = props.match.params.transactionId;

  if (!transactionId) {
    return false;
  }

  try {
    let transaction = await fetchTransaction(transactionId);

    if (transaction.status === 404) {
      redirect();
      return;
    }

    let firstStockId = transaction.stock_list[0];
    let firstStock = await fetchStock(firstStockId);
    let fromWarehouse = firstStock.from_warehouse;
    let toWarehouse = firstStock.to_warehouse;

    await store.dispatch({
      type: "TRANSACTION_STATE_RESET"
    });

    // HANDLE EXISTING TRANSACTION
    await store.dispatch({
      type: "TRANSACTION_STATE_ADD_EXISTING_TRANSACTION",
      payload: transactionId
    });

    // HANDLE MERCHANT
    let selectedMerchant = props.merchants.find(merchant => {
      return merchant.name === transaction.merchant;
    });

    await store.dispatch({
      type: "TRANSACTION_STATE_CHANGE_MERCHANT",
      payload: selectedMerchant
    });

    // HANDLE FROM WAREHOUSE
    if (fromWarehouse) {
      let selectedFromWarehouse = props.warehouses.find(warehouse => {
        return warehouse.name === fromWarehouse;
      });

      await store.dispatch({
        type: "TRANSACTION_STATE_CHANGE_FROM_WAREHOUSE",
        payload: selectedFromWarehouse
      });
    }

    // HANDLE TO WAREHOUSE
    if (toWarehouse) {
      let selectedToWarehouse = props.warehouses.find(warehouse => {
        return warehouse.name === toWarehouse;
      });

      await store.dispatch({
        type: "TRANSACTION_STATE_CHANGE_TO_WAREHOUSE",
        payload: selectedToWarehouse
      });
    }

    // HANDLE PRODUCTS
    transaction.stock_list.map(async stockId => {
      let stock = await fetchStock(stockId);
      let product = await props.products.find(product => {
        return product.name === stock.product;
      });

      let price = await stock.price;
      let quantity = await stock.quantity;
      let tax_rate = await stock.tax_rate;

      let transformedProduct = await transformSelectedProduct(
        product,
        price,
        quantity,
        tax_rate
      );

      await store.dispatch({
        type: "TRANSACTION_STATE_ADD_PRODUCT",
        payload: transformedProduct
      });
    });
  } catch (error) {
    Message(error);
  }
};

loadExistingTransaction.propTypes = {
  transactionId: PropTypes.string
};

export default loadExistingTransaction;
