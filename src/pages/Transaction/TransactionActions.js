import axios from "axios";
import Message from "components/Message/Message";

export const FETCH_TRANSACTION = "FETCH_TRANSACTION";
export const FETCH_TRANSACTION_FULFILLED = "FETCH_TRANSACTION_FULFILLED";
export const FETCH_TRANSACTION_REJECTED = "FETCH_TRANSACTION_REJECTED";

export const TRANSACTION_STATE_SET_TRANSACTION_TYPE =
  "TRANSACTION_STATE_SET_TRANSACTION_TYPE";
export const TRANSACTION_STATE_ADD_EXISTING_TRANSACTION =
  "TRANSACTION_STATE_ADD_EXISTING_TRANSACTION";
export const TRANSACTION_STATE_CHANGE_CUSTOMER =
  "TRANSACTION_STATE_CHANGE_CUSTOMER";
export const TRANSACTION_STATE_CHANGE_FROM_WAREHOUSE =
  "TRANSACTION_STATE_CHANGE_FROM_WAREHOUSE";
export const TRANSACTION_STATE_CHANGE_TO_WAREHOUSE =
  "TRANSACTION_STATE_CHANGE_TO_WAREHOUSE";
export const TRANSACTION_STATE_ADD_PRODUCT = "TRANSACTION_STATE_ADD_PRODUCT";
export const TRANSACTION_STATE_REMOVE_PRODUCT =
  "TRANSACTION_STATE_REMOVE_PRODUCT";
export const TRANSACTION_STATE_CHANGE_PRODUCT_ATTRIBUTE =
  "TRANSACTION_STATE_CHANGE_PRODUCT_ATTRIBUTE";
export const TRANSACTION_STATE_FETCHING = "TRANSACTION_STATE_FETCHING";
export const TRANSACTION_STATE_FETCHED = "TRANSACTION_STATE_FETCHED";
export const TRANSACTION_STATE_RESET = "TRANSACTION_STATE_RESET";
export const TRANSACTION_STATE_CHANGE_DAYS_DUE =
  "TRANSACTION_STATE_CHANGE_DAYS_DUE";

const url = process.env.REACT_APP_SERVER_URL;

export function deleteTransaction(id) {
  return async () => {
    try {
      const { data } = await axios.delete(url + "/transactions/" + id);
      await resetTransaction();
      Message("Transaction " + id + " deleted successfully!");
      return data;
    } catch (error) {
      Message("Could not delete transaction: " + error, "error");
    }
  };
}

export function fetchTransaction(id) {
  return async dispatch => {
    await dispatch({ type: FETCH_TRANSACTION });
    try {
      const { data } = await axios.get(url + "/transactions/" + id);
      await dispatch({
        type: FETCH_TRANSACTION_FULFILLED,
        payload: data
      });
      return data;
    } catch (error) {
      await dispatch({
        type: FETCH_TRANSACTION_REJECTED,
        payload: error
      });
      Message(
        "Could not fetch transaction " + id + ": " + error.response.data.detail,
        "error"
      );
    }
  };
}

export function addProductToTransaction(
  productId,
  fromWarehouseId = null,
  toWarehouseId = null,
  transactionId,
  quantity,
  price,
  tax_rate = null,
  business_name
) {
  return async () => {
    let url = process.env.REACT_APP_SERVER_URL;
    let payload = {};

    payload.price = price;
    payload.tax_rate = tax_rate;
    payload.product = productId;
    payload.from_warehouse = fromWarehouseId;
    payload.to_warehouse = toWarehouseId;
    payload.transaction = transactionId;
    payload.quantity = quantity;
    payload.business = {
      name: business_name
    };

    try {
      const { data } = await axios.post(url + "/stock/", payload);

      return data;
    } catch (error) {
      Message("Cannot add product to transaction: " + error, "error");
    }
  };
}

export function deleteStockFromTransaction(transactionId) {
  return async () => {
    try {
      const { data } = await axios.delete(
        url + "/stock/?transactionId=" + transactionId
      );

      Message("Stock deleted!", "success");

      return data;
    } catch (error) {
      Message("Could not delete stock: " + error, "error");
    }
  };
}

export function fetchStock(id) {
  return async () => {
    try {
      const { data } = await axios.get(url + "/stock/" + id);

      return data;
    } catch (error) {
      Message("Could not fetch stock: " + error);
    }
  };
}

export function fetchTransactionPdf(
  transactionId,
  transactionName,
  businessName
) {
  return async () => {
    try {
      const { data } = await axios.get(
        url +
          "/transactions/" +
          transactionId +
          "/pdf?business_name=" +
          businessName
      );

      const href = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = href;
      let filename = transactionName + ".pdf";
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      Message("PDF downloaded successfully!");
      return data;
    } catch (error) {
      Message("Could not download PDF: " + error, "error");
    }
  };
}

export function resetTransaction() {
  return async dispatch => {
    dispatch({
      type: TRANSACTION_STATE_RESET
    });
  };
}

export function removeProduct(productId) {
  return async dispatch => {
    dispatch({
      type: TRANSACTION_STATE_REMOVE_PRODUCT,
      id: parseInt(productId, 10)
    });
  };
}

export function selectWarehouse(direction, warehouses, selectedWarehouseName) {
  return async dispatch => {
    let dispatchTypeByDirection = {
      FROM: TRANSACTION_STATE_CHANGE_FROM_WAREHOUSE,
      TO: TRANSACTION_STATE_CHANGE_TO_WAREHOUSE
    };

    let selectedWarehouse = warehouses.filter(warehouse => {
      return warehouse.name === selectedWarehouseName;
    });

    dispatch({
      type: dispatchTypeByDirection[direction],
      payload: selectedWarehouse[0]
    });
  };
}

export function selectCustomer(customers, selectedCustomerName) {
  return async dispatch => {
    const selectedCustomer = customers.filter(customer => {
      return customer.name === selectedCustomerName;
    })[0];

    dispatch({
      type: TRANSACTION_STATE_CHANGE_CUSTOMER,
      payload: selectedCustomer
    });

    dispatch({
      type: TRANSACTION_STATE_CHANGE_DAYS_DUE,
      payload: selectedCustomer.default_days_due
    });

    dispatch({
      type: TRANSACTION_STATE_CHANGE_FROM_WAREHOUSE,
      payload: selectedCustomer.default_warehouse
    });
  };
}

export function calculateTotals(transactionState) {
  return () => {
    let total_without_tax = 0;
    let tax = 0;
    let total_with_tax = 0;

    transactionState.products.forEach(product => {
      total_without_tax += product.price * product.quantity;
      tax += product.tax_rate * product.price * product.quantity;
      total_with_tax = total_without_tax + tax;
    });

    return {
      total_without_tax: total_without_tax,
      tax: tax,
      total_with_tax: total_with_tax
    };
  };
}

export function updateInvoiceDaysDue(daysDue) {
  return async dispatch => {
    dispatch({
      type: TRANSACTION_STATE_CHANGE_DAYS_DUE,
      payload: daysDue
    });
  };
}

export function updateProductAttribute(productId, e) {
  return async dispatch => {
    dispatch({
      type: TRANSACTION_STATE_CHANGE_PRODUCT_ATTRIBUTE,
      id: parseInt(productId ? productId : e.target.id, 10),
      [e.target.name]: ["price", "tax_rate"].includes(e.target.name)
        ? parseFloat(e.target.value)
        : parseInt(e.target.value, 10)
    });
  };
}

export function selectProduct(products, selectedProductName) {
  return async dispatch => {
    let selectedProduct = products.find(product => {
      return product.name === selectedProductName;
    });

    selectedProduct = transformSelectedProduct(selectedProduct);

    dispatch({
      type: TRANSACTION_STATE_ADD_PRODUCT,
      payload: selectedProduct
    });
  };
}

const transformSelectedProduct = (
  selectedProduct,
  newPrice,
  newQuantity,
  newTaxRate
) => {
  let transformedProduct = {};
  transformedProduct.id = selectedProduct.id;
  transformedProduct.name = selectedProduct.name;
  transformedProduct.default_price = parseFloat(selectedProduct.default_price);
  transformedProduct.price = parseFloat(
    newPrice ? newPrice : selectedProduct.default_price
  );
  transformedProduct.quantity = parseInt(newQuantity ? newQuantity : 1, 10);
  transformedProduct.tax_rate = parseFloat(
    newTaxRate ? newTaxRate : selectedProduct.tax_rate
  );

  return transformedProduct;
};

export function loadExistingTransaction(
  customers,
  warehouses,
  products,
  transactionId
) {
  return async dispatch => {
    if (!transactionId) {
      return false;
    }

    try {
      let transaction = await dispatch(fetchTransaction(transactionId));
      if (transaction.status === 404) {
        return;
      }
      let firstStockId = transaction.stock_list[0];
      let firstStock = await dispatch(fetchStock(firstStockId));
      let fromWarehouse = firstStock.from_warehouse;
      let toWarehouse = firstStock.to_warehouse;
      await dispatch({
        type: TRANSACTION_STATE_RESET
      });
      // HANDLE EXISTING TRANSACTION
      await dispatch({
        type: TRANSACTION_STATE_ADD_EXISTING_TRANSACTION,
        payload: transactionId
      });
      // HANDLE CUSTOMER
      if (customers && transaction.customer) {
        const selectedCustomer = customers.find(customer => {
          return customer.name === transaction.customer.name;
        });
        await dispatch({
          type: TRANSACTION_STATE_CHANGE_CUSTOMER,
          payload: selectedCustomer
        });
      }
      // HANDLE FROM WAREHOUSE
      if (fromWarehouse) {
        let selectedFromWarehouse = warehouses.find(warehouse => {
          return warehouse.name === fromWarehouse;
        });
        await dispatch({
          type: TRANSACTION_STATE_CHANGE_FROM_WAREHOUSE,
          payload: selectedFromWarehouse
        });
      }
      // HANDLE TO WAREHOUSE
      if (toWarehouse) {
        let selectedToWarehouse = warehouses.find(warehouse => {
          return warehouse.name === toWarehouse;
        });
        await dispatch({
          type: TRANSACTION_STATE_CHANGE_TO_WAREHOUSE,
          payload: selectedToWarehouse
        });
      }
      // HANDLE TO WAREHOUSE
      if (transaction.days_due) {
        await dispatch({
          type: TRANSACTION_STATE_CHANGE_DAYS_DUE,
          payload: transaction.days_due
        });
      }
      // HANDLE PRODUCTS
      transaction.stock_list.map(async stockId => {
        let stock = await dispatch(fetchStock(stockId));
        let product = products.find(product => {
          return product.name === stock.product;
        });
        let price = stock.price;
        let quantity = stock.quantity;
        let tax_rate = stock.tax_rate;
        let transformedProduct = transformSelectedProduct(
          product,
          price,
          quantity,
          tax_rate
        );
        await dispatch({
          type: TRANSACTION_STATE_ADD_PRODUCT,
          payload: transformedProduct
        });
      });
    } catch (error) {
      Message("Could not load transaction: " + error, "error");
    }
  };
}

export function createTransaction(transactionState, business) {
  return async dispatch => {
    const createTransactionAPI = async (
      customerId,
      transactionType,
      daysDue,
      business_name
    ) => {
      let payload = {};

      payload.customer = customerId || null;
      payload.days_due = daysDue || null;
      payload.type = transactionType;
      payload.business = {
        name: business_name
      };

      dispatch({
        type: TRANSACTION_STATE_FETCHING
      });

      try {
        const { data } = await axios.post(url + "/transactions/", payload);

        dispatch({
          type: TRANSACTION_STATE_FETCHED
        });

        dispatch({
          type: TRANSACTION_STATE_RESET
        });

        Message("Transaction Created!", "success");

        return data;
      } catch (error) {
        Message("Could not create transaction: " + error, "error");
      }
    };

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
    const selectedCreateTransactionType =
      createTransactionTypes[transactionType];

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
      let transaction = await createTransactionAPI(
        customer.id,
        selectedCreateTransactionType,
        daysDue,
        business.name
      );

      products.forEach(product => {
        try {
          return dispatch(
            addProductToTransaction(
              product.id,
              fromWarehouseRequired ? fromWarehouse.id : null,
              toWarehouseRequired ? toWarehouse.id : null,
              transaction.id,
              product.quantity,
              product.price,
              product.tax_rate,
              business.name
            )
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
}

export function updateTransaction(transactionState, business) {
  return async dispatch => {
    const updateTransaction = async (transactionId, customerId, daysDue) => {
      return async dispatch => {
        let payload = {};

        payload.customer = customerId;
        payload.days_due = daysDue;

        dispatch({
          type: TRANSACTION_STATE_FETCHING
        });

        try {
          const { data } = await axios.patch(
            url + "/transactions/" + transactionId + "/",
            payload
          );

          dispatch({
            type: TRANSACTION_STATE_FETCHED
          });

          dispatch({
            type: TRANSACTION_STATE_RESET
          });

          Message("Transaction Updated!", "success");

          return data;
        } catch (error) {
          Message("Could not update transaction: " + error, "error");
        }
      };
    };

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

      await dispatch(deleteStockFromTransaction(existingTransactionId));

      products.forEach(async product => {
        let fromWarehouseId = fromWarehouseRequired ? fromWarehouse.id : null;
        let toWarehouseId = toWarehouseRequired ? toWarehouse.id : null;

        try {
          return await dispatch(
            addProductToTransaction(
              product.id,
              fromWarehouseId,
              toWarehouseId,
              existingTransactionId,
              product.quantity,
              product.price,
              product.tax_rate,
              business.name
            )
          );
        } catch (error) {
          Message("Something went wrong with " + product.name, "error");
        }
      });
      Message(
        "Transaction " + existingTransactionId + " was updated successfully.",
        "success"
      );
    } catch (error) {
      Message("Could not update transaction: " + error, "error");
    }
  };
}

export function setTransactionType(transactionType) {
  return async dispatch => {
    dispatch({
      type: TRANSACTION_STATE_SET_TRANSACTION_TYPE,
      payload: transactionType
    });
  };
}
