import axios from "axios";
import Message from "components/Message";

const loginWithGoogle = async props => {
  let client_id = process.env.REACT_APP_CLIENT_ID;
  let client_secret = process.env.REACT_APP_CLIENT_SECRET;
  let url = process.env.REACT_APP_SERVER_URL;

  let formdata = new FormData();
  formdata.append("grant_type", "convert_token");
  formdata.append("client_id", client_id);
  formdata.append("client_secret", client_secret);
  formdata.append("backend", "google-oauth2");
  formdata.append("token", props.accessToken);

  try {
    const { data } = await axios.post(url + "/auth/convert-token/", formdata, {
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

    Message("Welcome to Stashhouse!");
  } catch (error) {
    Message(error, "error");
  }
};

export default loginWithGoogle;
