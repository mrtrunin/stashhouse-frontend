export default function reducer(
  state = {
    merchant: {},
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_MERCHANT": {
      return { ...state, fetching: true };
    }
    case "FETCH_MERCHANT_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        merchant: action.payload
      };
    }
    case "MERCHANT_UPDATE_FIELD": {
      return {
        ...state,
        merchant: {
          ...state.merchant,
          [action.field]: action.payload
        }
      };
    }
    case "FETCH_MERCHANT_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "RESET_MERCHANT": {
      return { ...state, merchant: {} };
    }
    default:
  }

  return state;
}
