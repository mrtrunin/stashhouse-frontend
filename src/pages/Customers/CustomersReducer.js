import {
  FETCH_CUSTOMERS,
  FETCH_CUSTOMERS_FULFILLED,
  FETCH_CUSTOMERS_REJECTED
} from "./CustomersActions";

export default function transactions(
  state = {
    customers: [],
    count: 0,
    next: null,
    previous: null,
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case FETCH_CUSTOMERS: {
      return { ...state, fetching: true };
    }
    case FETCH_CUSTOMERS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        customers: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous
      };
    }
    case FETCH_CUSTOMERS_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
