import store from "store";
import axios from "axios";
import Message from "components/Message";

async function fetchProductsStock() {
  let url = process.env.REACT_APP_SERVER_URL;

  await store.dispatch({
    type: "FETCH_PRODUCTS_STOCK"
  });

  try {
    const { data } = await axios.get(url + "/products-stock/", {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    await store.dispatch({
      type: "FETCH_PRODUCTS_STOCK_FULFILLED",
      payload: data
    });

    return data;
  } catch (error) {
    Message(error);
  }
}

export default fetchProductsStock;
