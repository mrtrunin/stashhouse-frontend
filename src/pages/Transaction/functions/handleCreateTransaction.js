import PropTypes from "prop-types";
import Message from "components/Message/Message";

const handleCreateTransaction = async (
  transactionState,
  business,
  createTransaction,
  addProductToTransaction,
  e
) => {
  e.preventDefault();

  const createTransactionTypes = {
    buy: "PURCHASE",
    sell: "INVOICE",
    move: "TRANSFER",
    writeoff: "WRITEOFF"
  };

  const {
    transactionType,
    products,
    fromWarehouse,
    toWarehouse,
    daysDue
  } = transactionState;
  const selectedCreateTransactionType = createTransactionTypes[transactionType];

  const customer = ["sell"].includes(transactionType)
    ? transactionState.customer
    : {};

  const hasNoProducts = Object.keys(products).length === 0;
  const hasNoCustomers = Object.keys(customer).length === 0;
  const hasNoFromWarehouse = Object.keys(fromWarehouse).length === 0;
  const hasNoToWarehouse = Object.keys(toWarehouse).length === 0;
  const hasNoDaysDue = daysDue === undefined;

  const fromWarehouseRequired = ["sell", "move", "writeoff"].includes(
    transactionType
  );
  const toWarehouseRequired = ["buy", "move"].includes(transactionType);
  const customerRequired = ["sell"].includes(transactionType);
  const daysDueRequired = ["sell"].includes(transactionType);

  if (hasNoDaysDue && daysDueRequired) {
    return Message("Days Due is missing!");
  }

  if (hasNoCustomers && customerRequired) {
    return Message("Customer is missing!");
  }

  if (hasNoFromWarehouse && fromWarehouseRequired) {
    return Message("From Warehouse is missing!");
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
      daysDue,
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
