import updateTransaction from "api/Transaction/updateTransaction";
import Message from "components/Message";
import addProductToTransaction from "api/addProductToTransaction";
import deleteStockFromTransaction from "api/deleteStockFromTransaction";

const handleUpdateTransaction = async (transactionState, business) => {
  const {
    existingTransactionId,
    merchant,
    fromWarehouse,
    toWarehouse,
    products,
    transactionType
  } = transactionState;

  let hasNoProducts = Object.keys(products).length === 0;
  let hasNoMerchants = Object.keys(merchant).length === 0;
  let hasNoFromWarehouse = Object.keys(fromWarehouse).length === 0;
  let hasNoToWarehouse = Object.keys(toWarehouse).length === 0;

  let fromWarehouseRequired = ["sell", "move"].includes(transactionType);
  let toWarehouseRequired = ["buy", "move"].includes(transactionType);

  if (hasNoProducts) {
    return Message("Product is missing!");
  }

  if (hasNoMerchants) {
    return Message("Merchant is missing!");
  }

  if (hasNoFromWarehouse && fromWarehouseRequired) {
    return Message("From warehouse is missing!");
  }

  if (hasNoToWarehouse && toWarehouseRequired) {
    return Message("To Warehouse is missing!");
  }

  try {
    await updateTransaction(existingTransactionId, merchant.id);

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
        await Message("Product successfully added to Transaction!");
      } catch (error) {
        Message("Something went wrong with " + product.name, "error");
      }
    });
  } catch (error) {
    Message(error);
  }
};

handleUpdateTransaction.propTypes = {};

export default handleUpdateTransaction;
