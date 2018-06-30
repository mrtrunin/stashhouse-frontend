export default function reducer(
  state = {
    product: {},
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_PRODUCT": {
      return { ...state, fetching: true };
    }
    case "FETCH_PRODUCT_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        product: action.payload
      };
    }
    case "PRODUCT_UPDATE_FIELD": {
      return {
        ...state,
        product: {
          ...state.product,
          [action.field]: action.payload
        }
      };
    }
    case "FETCH_PRODUCT_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    case "RESET_PRODUCT": {
      return { ...state, product: {} };
    }
    default:
  }

  return state;
}
