import Message from "components/Message/Message";

const handleUpdateTransaction = async (
  transactionState,
  business,
  updateTransaction,
  addProductToTransaction,
  deleteStockFromTransaction
) => {
  const {
    existingTransactionId,
    customer = null,
    fromWarehouse,
    toWarehouse,
    products,
    transactionType,
    daysDue
  } = transactionState;

  const hasNoProducts = Object.keys(products).length === 0;
  const hasNoFromWarehouse = Object.keys(fromWarehouse).length === 0;
  const hasNoToWarehouse = Object.keys(toWarehouse).length === 0;
  const hasNoDaysDue = daysDue === undefined;

  const hasNoCustomers = customer ? Object.keys(customer).length === 0 : true;

  const fromWarehouseRequired = ["sell", "move"].includes(transactionType);
  const toWarehouseRequired = ["buy", "move"].includes(transactionType);
  const customerRequired = ["sell"].includes(transactionType);
  const daysDueRequired = ["sell"].includes(transactionType);

  const customerId = hasNoCustomers ? null : customer.id;

  if (hasNoDaysDue && daysDueRequired) {
    return Message("Days Due is missing!", "warning");
  }

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
    await updateTransaction(existingTransactionId, customerId, daysDue);

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
