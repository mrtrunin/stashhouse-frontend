import {
  FETCH_PAYMENTS,
  FETCH_PAYMENTS_FULFILLED,
  FETCH_PAYMENTS_REJECTED,
  FETCH_INVOICES,
  FETCH_INVOICES_FULFILLED,
  FETCH_INVOICES_REJECTED
} from "./PaymentsActions";

export default function reducer(
  state = {
    payments: {},
    invoices: {},
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
        payments: action.payload
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
        invoices: action.payload
      };
    }
    case FETCH_INVOICES_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
