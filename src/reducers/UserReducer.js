export default function reducer(
  state = {
    user: {},
    isLoggedIn: false,
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_USER": {
      return { ...state, fetching: true };
    }
    case "FETCH_USER_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        isLoggedIn: true,
        user: action.payload
      };
    }
    case "FETCH_USER_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
