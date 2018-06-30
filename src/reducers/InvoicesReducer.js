export default function reducer(
  state = {
    invoices: {},
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_INVOICES": {
      return { ...state, fetching: true };
    }
    case "FETCH_INVOICES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        invoices: action.payload
      };
    }
    case "FETCH_INVOICES_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
