export default function reducer(
  state = {
    merchants: {},
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_MERCHANTS": {
      return { ...state, fetching: true };
    }
    case "FETCH_MERCHANTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        merchants: action.payload
      };
    }
    case "FETCH_MERCHANTS_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
