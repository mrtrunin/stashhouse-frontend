import Message from "components/Message";
import store from "store";
import axios from "axios";

export function fetchBusinesses() {
  return axios
    .get(process.env.REACT_APP_SERVER_URL + "/businesses/", {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    })
    .then(results => {
      return results.data;
    })
    .then(results => {
      store.dispatch({
        type: "FETCH_BUSINESSES_FULFILLED",
        payload: results
      });
      return results;
    })
    .catch(error => {
      Message(error);
    });
}
