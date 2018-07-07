import PropTypes from "prop-types";
import Message from "components/Message";

import createTransaction from "api/Transaction/createTransaction";
import addProductToTransaction from "api/addProductToTransaction";

const handleCreateTransaction = async (transactionState, business, e) => {
  e.preventDefault();

  let createTransactionTypes = {
    buy: "PURCHASE",
    sell: "INVOICE",
    move: "TRANSFER"
  };

  const {
    transactionType,
    products,
    fromWarehouse,
    toWarehouse
  } = transactionState;
  let selectedCreateTransactionType = createTransactionTypes[transactionType];

  let merchant = ["sell"].includes(transactionType)
    ? transactionState.merchant
    : {};

  let hasNoProducts = Object.keys(products).length === 0;
  let hasNoMerchants = Object.keys(merchant).length === 0;
  let hasNoFromWarehouse = Object.keys(fromWarehouse).length === 0;
  let hasNoToWarehouse = Object.keys(toWarehouse).length === 0;

  let fromWarehouseRequired = ["sell", "move"].includes(transactionType);
  let toWarehouseRequired = ["buy", "move"].includes(transactionType);
  let merchantRequired = ["sell"].includes(transactionType);

  if (hasNoMerchants && merchantRequired) {
    return Message("Customer is missing!");
  }

  if (hasNoFromWarehouse && fromWarehouseRequired) {
    return Message("From warehouse is missing!");
  }

  if (hasNoToWarehouse && toWarehouseRequired) {
    return Message("To Warehouse is missing!");
  }

  if (hasNoProducts) {
    return Message("Product is missing!");
  }

  if (fromWarehouse === toWarehouse) {
    return Message(
      "Looks like you're not really moving much, are you? Hint: your From and To Warehouses are the same!"
    );
  }

  try {
    let transaction = await createTransaction(
      merchant.id,
      selectedCreateTransactionType,
      business.name
    );

    let transactionId = transaction.id;

    products.forEach(product => {
      let fromWarehouseId = fromWarehouseRequired ? fromWarehouse.id : null;
      let toWarehouseId = toWarehouseRequired ? toWarehouse.id : null;

      try {
        addProductToTransaction(
          product.id,
          fromWarehouseId,
          toWarehouseId,
          transactionId,
          product.quantity,
          product.price,
          product.tax_rate,
          business.name
        );
        Message("Product successfully added to Transaction!");
      } catch (error) {
        Message("Something went wrong with " + product.name, "error");
      }
    });
  } catch (error) {
    return Message(error);
  }
};

handleCreateTransaction.propTypes = {
  products: PropTypes.array
};

export default handleCreateTransaction;
