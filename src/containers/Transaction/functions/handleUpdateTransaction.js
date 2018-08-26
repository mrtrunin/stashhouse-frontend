import Message from "components/Message/Message";
import addProductToTransaction from "api/addProductToTransaction";
import deleteStockFromTransaction from "api/deleteStockFromTransaction";

const handleUpdateTransaction = async (
  transactionState,
  business,
  updateTransaction
) => {
  const {
    existingTransactionId,
    customer = null,
    fromWarehouse,
    toWarehouse,
    products,
    transactionType
  } = transactionState;

  let hasNoProducts = Object.keys(products).length === 0;
  let hasNoFromWarehouse = Object.keys(fromWarehouse).length === 0;
  let hasNoToWarehouse = Object.keys(toWarehouse).length === 0;

  let hasNoCustomers = customer ? Object.keys(customer).length === 0 : true;

  let fromWarehouseRequired = ["sell", "move"].includes(transactionType);
  let toWarehouseRequired = ["buy", "move"].includes(transactionType);
  let customerRequired = ["sell"].includes(transactionType);

  let customerId = hasNoCustomers ? null : customer.id;

  if (hasNoProducts) {
    return Message("Product is missing!", "warning");
  }

  if (hasNoCustomers && customerRequired) {
    return Message("Customer is missing!", "warning");
  }

  if (hasNoFromWarehouse && fromWarehouseRequired) {
    return Message("From warehouse is missing!", "warning");
  }

  if (hasNoToWarehouse && toWarehouseRequired) {
    return Message("To Warehouse is missing!", "warning");
  }

  try {
    await updateTransaction(existingTransactionId, customerId);

    await deleteStockFromTransaction(existingTransactionId);

    products.forEach(async product => {
      let fromWarehouseId = fromWarehouseRequired ? fromWarehouse.id : null;
      let toWarehouseId = toWarehouseRequired ? toWarehouse.id : null;

      try {
        await addProductToTransaction(
          product.id,
          fromWarehouseId,
          toWarehouseId,
          existingTransactionId,
          product.quantity,
          product.price,
          product.tax_rate,
          business.name
        );
        await Message("Product successfully added to Transaction!", "success");
      } catch (error) {
        Message("Something went wrong with " + product.name, "error");
      }
    });
  } catch (error) {
    Message("Could not update transaction: " + error, "error");
  }
};

handleUpdateTransaction.propTypes = {};

export default handleUpdateTransaction;
