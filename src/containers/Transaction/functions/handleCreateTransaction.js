import PropTypes from "prop-types";
import Message from "components/Message/Message";

import addProductToTransaction from "api/addProductToTransaction";

const handleCreateTransaction = async (
  transactionState,
  business,
  createTransaction,
  e
) => {
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

  let customer = ["sell"].includes(transactionType)
    ? transactionState.customer
    : {};

  let hasNoProducts = Object.keys(products).length === 0;
  let hasNoCustomers = Object.keys(customer).length === 0;
  let hasNoFromWarehouse = Object.keys(fromWarehouse).length === 0;
  let hasNoToWarehouse = Object.keys(toWarehouse).length === 0;

  let fromWarehouseRequired = ["sell", "move"].includes(transactionType);
  let toWarehouseRequired = ["buy", "move"].includes(transactionType);
  let customerRequired = ["sell"].includes(transactionType);

  if (hasNoCustomers && customerRequired) {
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
      customer.id,
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
      } catch (error) {
        Message(
          "Something went wrong with adding product " +
            product.name +
            " to transaction",
          "error"
        );
      }
    });
  } catch (error) {
    return Message("Could not create transaction: " + error);
  }
};

handleCreateTransaction.propTypes = {
  products: PropTypes.array
};

export default handleCreateTransaction;
