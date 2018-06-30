import store from "store";
import axios from "axios";

async function fetchProduct(productId) {
  let url = process.env.REACT_APP_SERVER_URL;

  store.dispatch({
    type: "FETCH_PRODUCT"
  });

  try {
    const { data } = await axios.get(url + "/products/" + productId, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    store.dispatch({
      type: "FETCH_PRODUCT_FULFILLED",
      payload: data
    });
  } catch (error) {
    store.dispatch({
      type: "FETCH_PRODUCT_REJECTED",
      payload: error
    });
  }
}

export default fetchProduct;
