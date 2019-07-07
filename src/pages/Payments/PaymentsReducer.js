import {
  FETCH_PAYMENTS,
  FETCH_PAYMENTS_FULFILLED,
  FETCH_PAYMENTS_REJECTED,
  FETCH_INVOICES,
  FETCH_INVOICES_FULFILLED,
  FETCH_INVOICES_REJECTED,
  IMPORT_STATEMENT,
  IMPORT_STATEMENT_FULFILLED,
  IMPORT_STATEMENT_REJECTED
} from "./PaymentsActions";

export default function reducer(
  state = {
    payments: [],
    invoices: [],
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
    case FETCH_PAYMENTS: {
      return { ...state, fetching: true };
    }
    case FETCH_PAYMENTS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        payments: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous
      };
    }
    case FETCH_PAYMENTS_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case FETCH_INVOICES: {
      return { ...state, fetching: true };
    }
    case FETCH_INVOICES_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        invoices: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous
      };
    }
    case FETCH_INVOICES_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case IMPORT_STATEMENT: {
      return { ...state, fetching: true, fetched: false };
    }
    case IMPORT_STATEMENT_FULFILLED: {
      return { ...state, fetching: false, fetched: true };
    }
    case IMPORT_STATEMENT_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
