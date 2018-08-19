import store from "store";
import axios from "axios";

async function fetchCustomers(businessName) {
  let url = process.env.REACT_APP_SERVER_URL;

  await store.dispatch({
    type: "FETCH_CUSTOMERS"
  });

  await axios
    .get(url + "/customers/?business_name=" + businessName, {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    })
    .then(results => {
      return results.data;
    })

    .then(data => {
      store.dispatch({
        type: "FETCH_CUSTOMERS_FULFILLED",
        payload: data
      });
    })
    .catch(error => {
      store.dispatch({
        type: "FETCH_CUSTOMERS_REJECTED",
        payload: error
      });
    });
}

export default fetchCustomers;
