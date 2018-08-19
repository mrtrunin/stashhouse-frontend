import axios from "axios";
import store from "store";

const refreshToken = async () => {
  let client_id = process.env.REACT_APP_CLIENT_ID;
  let client_secret = process.env.REACT_APP_CLIENT_SECRET;
  let url = process.env.REACT_APP_SERVER_URL;

  let formdata = new FormData();
  formdata.append("grant_type", "refresh_token");
  formdata.append("refresh_token", localStorage.refresh_token);
  formdata.append("client_id", client_id);
  formdata.append("client_secret", client_secret);

  try {
    const { data } = await axios.post(url + "/auth/token/", formdata, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    const access_token = data.access_token;
    const refresh_token = data.refresh_token;
    const expiration_time = Date.now() + data.expires_in * 1000;

    localStorage.setItem("jwtToken", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    localStorage.setItem("jwtToken_expiration_time", expiration_time);
    // Message("Token refreshed successfully");
  } catch (error) {
    // Message(error);

    store.dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("jwtToken_expiration_time");
    localStorage.removeItem("state");
  }
};

export default refreshToken;
