import axios from "axios";
import Message from "components/Message";

async function updateProduct(name, ean, default_price, tax_rate, productId) {
  let url = process.env.REACT_APP_SERVER_URL;

  let payload = {};

  payload.name = name;
  payload.ean = ean;
  payload.default_price = default_price;
  payload.tax_rate = tax_rate;

  try {
    const { data } = await axios.patch(
      url + "/products/" + productId + "/",
      payload,
      {
        headers: {
          Authorization: "Bearer " + localStorage.jwtToken
        }
      }
    );

    Message("Product Updated Successfully!");

    return data;
  } catch (error) {
    Message(error, "error");
  }
}

export default updateProduct;
