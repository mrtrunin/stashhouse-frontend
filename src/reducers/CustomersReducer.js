export default function reducer(
  state = {
    customers: {},
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_CUSTOMERS": {
      return { ...state, fetching: true };
    }
    case "FETCH_CUSTOMERS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        customers: action.payload
      };
    }
    case "FETCH_CUSTOMERS_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
