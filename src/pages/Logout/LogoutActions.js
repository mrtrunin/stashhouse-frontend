import axios from "axios";
import Message from "components/Message/Message";

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

    await dispatch({ type: USER_LOGOUT });

    try {
      await axios.post(url + "/auth/revoke-token/", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token
        }
      });

      Message("Logged out successfully", "success");
    } catch (error) {
      Message("Could not log out", "error");
    }
    localStorage.clear();
  };
}
