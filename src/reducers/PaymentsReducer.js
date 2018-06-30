export default function reducer(
  state = {
    payments: {},
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_PAYMENTS": {
      return { ...state, fetching: true };
    }
    case "FETCH_PAYMENTS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        payments: action.payload
      };
    }
    case "FETCH_PAYMENTS_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
