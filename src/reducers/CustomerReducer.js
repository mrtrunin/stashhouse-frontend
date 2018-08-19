export default function reducer(
  state = {
    customer: {},
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_CUSTOMER": {
      return { ...state, fetching: true };
    }
    case "FETCH_CUSTOMER_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        customer: action.payload
      };
    }
    case "CUSTOMER_UPDATE_FIELD": {
      return {
        ...state,
        customer: {
          ...state.customer,
          [action.field]: action.payload
        }
      };
    }
    case "FETCH_CUSTOMER_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "RESET_CUSTOMER": {
      return { ...state, customer: {} };
    }
    default:
  }

  return state;
}
