import store from "store";
import axios from "axios";

async function fetchWarehouse(warehouseId) {
  let url = process.env.REACT_APP_SERVER_URL;

  store.dispatch({
    type: "FETCH_WAREHOUSE"
  });

  try {
    const { data } = await axios.get(url + "/warehouses/" + warehouseId, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    });

    store.dispatch({
      type: "FETCH_WAREHOUSE_FULFILLED",
      payload: data
    });
  } catch (error) {
    store.dispatch({
      type: "FETCH_WAREHOUSE_REJECTED",
      payload: error
    });
  }
}

export default fetchWarehouse;
