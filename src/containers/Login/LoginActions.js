import axios from "axios";
import Message from "components/Message";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_FULFILLED = "FETCH_USER_FULFILLED";
export const FETCH_USER_REJECTED = "FETCH_USER_REJECTED";

export const FETCH_AUTH_TOKEN = "FETCH_AUTH_TOKEN";
export const FETCH_AUTH_TOKEN_FULFILLED = "FETCH_AUTH_TOKEN_FULFILLED";
export const FETCH_AUTH_TOKEN_REJECTED = "FETCH_AUTH_TOKEN_REJECTED";

export function login(data) {
  return dispatch => {
    let client_id = process.env.REACT_APP_CLIENT_ID;
    let client_secret = process.env.REACT_APP_CLIENT_SECRET;
    let url = process.env.REACT_APP_SERVER_URL;

    let formdata = new FormData();
    formdata.append("grant_type", "password");
    formdata.append("username", data.username);
    formdata.append("password", data.password);
    formdata.append("client_id", client_id);
    formdata.append("client_secret", client_secret);

    dispatch({ type: FETCH_AUTH_TOKEN });
    try {
      const { data } = axios.post(url + "/auth/token/", formdata, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      handleLoginSuccess(dispatch, data);
    } catch (error) {
      handleLoginFailure(dispatch, error);
    }
  };
}

export const loginWithGoogle = props => {
  return async dispatch => {
    let client_id = process.env.REACT_APP_CLIENT_ID;
    let client_secret = process.env.REACT_APP_CLIENT_SECRET;
    let url = process.env.REACT_APP_SERVER_URL;

    let formdata = new FormData();
    formdata.append("grant_type", "convert_token");
    formdata.append("client_id", client_id);
    formdata.append("client_secret", client_secret);
    formdata.append("backend", "google-oauth2");
    formdata.append("token", props.accessToken);

    dispatch({ type: FETCH_AUTH_TOKEN });

    try {
      const { data } = await axios.post(
        url + "/auth/convert-token/",
        formdata,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      await handleLoginSuccess(dispatch, data);
    } catch (error) {
      handleLoginFailure(dispatch, error);
    }
  };
};

export function fetchUserData() {
  return async dispatch => {
    await dispatch({ type: FETCH_USER });
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/users/me/",
        {
          headers: {
            Authorization: "Bearer " + localStorage.jwtToken
          }
        }
      );
      await dispatch({
        type: FETCH_USER_FULFILLED,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: FETCH_USER_REJECTED,
        payload: error
      });
    }
  };
}

// Private functions used to simplify the functions above

const handleLoginSuccess = (dispatch, data) => {
  const accessToken = data.access_token;
  const refreshToken = data.refresh_token;
  const expiresIn = data.expires_in;

  dispatch({
    type: FETCH_AUTH_TOKEN_FULFILLED,
    payload: {
      accessToken,
      refreshToken,
      expiresIn,
      expirationTime: Date.now() + expiresIn * 1000
    }
  });

  localStorage.setItem("jwtToken", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
  localStorage.setItem(
    "jwtToken_expiration_time",
    Date.now() + expiresIn * 1000
  );

  Message("Welcome to Stashhouse!");
};

const handleLoginFailure = (dispatch, error) => {
  dispatch({
    type: FETCH_AUTH_TOKEN_REJECTED,
    payload: error
  });
};
