import {
  FETCH_USER,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED
} from "./LoginActions";

export default function user(
  state = {
    user: {},
    isLoggedIn: false, //TODO: to remove
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case FETCH_USER: {
      return { ...state, fetching: true };
    }

    case FETCH_USER_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        isLoggedIn: true, //TODO: to remove
        user: action.payload
      };
    }

    case FETCH_USER_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }

    default:
  }

  return state;
}
