import store from "store";
import axios from "axios";

async function fetchWarehouses(business_name) {
  let url = process.env.REACT_APP_SERVER_URL;

  store.dispatch({
    type: "FETCH_WAREHOUSES"
  });

  await axios
    .get(url + "/warehouses/?business_name=" + business_name, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    })
    .then(results => {
      return results.data;
    })
    .then(data => {
      store.dispatch({
        type: "FETCH_WAREHOUSES_FULFILLED",
        payload: data
      });
    })
    .catch(error => {
      store.dispatch({
        type: "FETCH_WAREHOUSES_REJECTED",
        payload: error
      });
    });
}

export default fetchWarehouses;
