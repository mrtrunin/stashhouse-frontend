import axios from "axios";
import Message from "components/Message";

export function login(data) {
  let client_id = process.env.REACT_APP_CLIENT_ID;
  let client_secret = process.env.REACT_APP_CLIENT_SECRET;
  let url = process.env.REACT_APP_SERVER_URL;

  let formdata = new FormData();
  formdata.append("grant_type", "password");
  formdata.append("username", data.username);
  formdata.append("password", data.password);
  formdata.append("client_id", client_id);
  formdata.append("client_secret", client_secret);

  return axios
    .post(url + "/auth/token/", formdata, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(results => {
      return results.data;
    })
    .then(results => {
      const access_token = results.access_token;
      const refresh_token = results.refresh_token;
      const expiration_time = Date.now() + results.expires_in * 1000;

      localStorage.setItem("jwtToken", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("jwtToken_expiration_time", expiration_time);

      Message("Welcome to Stashhouse!");
    })
    .catch(error => {
      Message(error);
    });
}
