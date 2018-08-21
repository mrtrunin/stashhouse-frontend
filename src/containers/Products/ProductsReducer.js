import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_FULFILLED,
  FETCH_PRODUCTS_REJECTED,
  FETCH_PRODUCTS_STOCK,
  FETCH_PRODUCTS_STOCK_FULFILLED,
  FETCH_PRODUCTS_STOCK_REJECTED
} from "./ProductsActions";

export default function reducer(
  state = {
    products: {},
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return { ...state, fetching: true };
    }
    case FETCH_PRODUCTS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        products: action.payload
      };
    }
    case FETCH_PRODUCTS_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case FETCH_PRODUCTS_STOCK: {
      return { ...state, fetching: true };
    }
    case FETCH_PRODUCTS_STOCK_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        products: action.payload
      };
    }
    case FETCH_PRODUCTS_STOCK_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }

    default:
  }

  return state;
}
