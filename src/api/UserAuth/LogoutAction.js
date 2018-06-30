import store from "store";
import axios from "axios";
import Message from "components/Message";

export function logout() {
  let client_id = process.env.REACT_APP_CLIENT_ID;
  let client_secret = process.env.REACT_APP_CLIENT_SECRET;
  let url = process.env.REACT_APP_SERVER_URL;

  const token = localStorage.jwtToken;

  let data = new FormData();
  data.append("token", token);
  data.append("client_id", client_id);
  data.append("client_secret", client_secret);

  return axios
    .post(url + "/auth/revoke-token/", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + token
      }
    })
    .then(() => {
      store.dispatch({ type: "USER_LOGOUT" });

      localStorage.removeItem("refresh_token");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("jwtToken_expiration_time");
      localStorage.removeItem("reduxState");

      Message("Logged out successfully");
    })
    .catch(error => {
      Message(error, "error");
      store.dispatch({ type: "USER_LOGOUT" });
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("jwtToken_expiration_time");
      localStorage.removeItem("reduxState");
    });
}
