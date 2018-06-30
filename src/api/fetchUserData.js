import Message from "components/Message";
import store from "store";
import axios from "axios";

export function fetchUserData() {
  return axios
    .get(process.env.REACT_APP_SERVER_URL + "/users/me/", {
      headers: {
        Authorization: "Bearer " + localStorage.jwtToken
      }
    })
    .then(results => {
      return results.data;
    })
    .then(results => {
      store.dispatch({
        type: "FETCH_USER_FULFILLED",
        payload: results
      });
      return results;
    })
    .catch(error => {
      Message(error);
    });
}
