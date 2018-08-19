import axios from "axios";
import Message from "components/Message";

export const USER_LOGOUT = "USER_LOGOUT";

export function logout() {
  return async dispatch => {
    const client_id = process.env.REACT_APP_CLIENT_ID;
    const client_secret = process.env.REACT_APP_CLIENT_SECRET;
    const url = process.env.REACT_APP_SERVER_URL;

    const token = localStorage.jwtToken;

    const data = new FormData();
    data.append("token", token);
    data.append("client_id", client_id);
    data.append("client_secret", client_secret);

    try {
      await axios.post(url + "/auth/revoke-token/", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token
        }
      });
      await dispatch({ type: USER_LOGOUT });

      localStorage.removeItem("refresh_token");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("jwtToken_expiration_time");
      localStorage.removeItem("state");

      Message("Logged out successfully");
    } catch (error) {
      Message(error, "error");
      dispatch({ type: USER_LOGOUT });
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("jwtToken_expiration_time");
      localStorage.removeItem("state");
    }
  };
}
