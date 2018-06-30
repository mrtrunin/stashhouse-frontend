import store from "store";
import axios from "axios";

async function fetchMerchants() {
  let url = process.env.REACT_APP_SERVER_URL;

  await store.dispatch({
    type: "FETCH_MERCHANTS"
  });

  await axios
    .get(url + "/merchants/", {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    })
    .then(results => {
      return results.data;
    })

    .then(data => {
      store.dispatch({
        type: "FETCH_MERCHANTS_FULFILLED",
        payload: data
      });
    })
    .catch(error => {
      store.dispatch({
        type: "FETCH_MERCHANTS_REJECTED",
        payload: error
      });
    });
}

export default fetchMerchants;
