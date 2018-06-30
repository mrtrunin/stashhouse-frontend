import store from "store";
import axios from "axios";

async function fetchProducts() {
  let url = process.env.REACT_APP_SERVER_URL;

  store.dispatch({
    type: "FETCH_PRODUCTS"
  });

  try {
    const { data } = await axios.get(url + "/products/", {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    store.dispatch({
      type: "FETCH_PRODUCTS_FULFILLED",
      payload: data
    });
  } catch (error) {
    store.dispatch({
      type: "FETCH_PRODUCTS_REJECTED",
      payload: error
    });
  }
}

export default fetchProducts;
