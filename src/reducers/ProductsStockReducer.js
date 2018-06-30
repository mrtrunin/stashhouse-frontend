export default function reducer(
  state = {
    productsStock: {},
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_PRODUCTS_STOCK": {
      return { ...state, fetching: true };
    }
    case "FETCH_PRODUCTS_STOCK_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        productsStock: action.payload
      };
    }
    case "FETCH_PRODUCTS_STOCK_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
