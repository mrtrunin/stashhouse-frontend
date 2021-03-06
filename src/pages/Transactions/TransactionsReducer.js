import {
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_FULFILLED,
  FETCH_TRANSACTIONS_REJECTED
} from "./TransactionsActions";

export function transactions(
  state = {
    transactions: [],
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
    case FETCH_TRANSACTIONS: {
      return { ...state, fetching: true };
    }
    case FETCH_TRANSACTIONS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        transactions: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous
      };
    }
    case FETCH_TRANSACTIONS_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
