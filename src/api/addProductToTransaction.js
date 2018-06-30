import axios from "axios";
import Message from "components/Message";

async function addProductToTransaction(
  productId,
  fromWarehouseId = null,
  toWarehouseId = null,
  transactionId,
  quantity,
  price,
  tax_rate = null
) {
  let url = process.env.REACT_APP_SERVER_URL;
  let payload = {};

  payload.price = price;
  payload.tax_rate = tax_rate;
  payload.product = productId;
  payload.from_warehouse = fromWarehouseId;
  payload.to_warehouse = toWarehouseId;
  payload.transaction = transactionId;
  payload.quantity = quantity;

  try {
    const { data } = await axios.post(url + "/stock/", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    return data;
  } catch (error) {
    Message("Cannot add product to transaction: " + error, "error");
  }
}

export default addProductToTransaction;
