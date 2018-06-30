import axios from "axios";
import Message from "components/Message";

async function createProduct(name, ean, default_price, tax_rate) {
  let url = process.env.REACT_APP_SERVER_URL;

  let payload = {};

  payload.name = name;
  payload.ean = ean;
  payload.default_price = default_price;
  payload.tax_rate = tax_rate;

  try {
    const { data } = await axios.post(url + "/products/", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    Message("Product Created!");

    return data;
  } catch (error) {
    Message(error, "error");
  }
}

export default createProduct;
