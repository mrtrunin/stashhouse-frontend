export default function reducer(
  state = {
    businesses: [],
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_BUSINESSES": {
      return { ...state, fetching: true };
    }
    case "FETCH_BUSINESSES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        businesses: action.payload
      };
    }
    case "FETCH_BUSINESSES_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
