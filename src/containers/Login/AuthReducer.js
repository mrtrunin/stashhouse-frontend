import {
  FETCH_AUTH_TOKEN,
  FETCH_AUTH_TOKEN_FULFILLED,
  FETCH_AUTH_TOKEN_REJECTED
} from "./LoginActions";

export default function auth(
  state = {
    authToken: {
      accessToken: "",
      expiresIn: 0,
      refreshToken: ""
    },
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case FETCH_AUTH_TOKEN: {
      return { ...state, fetching: true };
    }

    case FETCH_AUTH_TOKEN_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        authToken: {
          accessToken: action.payload.accessToken,
          expiresIn: action.payload.expiresIn,
          refreshToken: action.payload.refreshToken
        }
      };
    }

    case FETCH_AUTH_TOKEN_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }

    default:
  }

  return state;
}
