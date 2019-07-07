import {
  FETCH_EMAILS,
  FETCH_EMAILS_FULFILLED,
  FETCH_EMAILS_REJECTED,
  FETCH_EMAILS_FOR_TRANSACTION_FULFILLED
} from "./EmailActions";

export default function reducer(
  state = {
    emails: [],
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
    case FETCH_EMAILS: {
      return { ...state, fetching: true };
    }
    case FETCH_EMAILS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        emails: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous
      };
    }
    case FETCH_EMAILS_FOR_TRANSACTION_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        emails: action.payload,
        count: action.payload.length
      };
    }
    case FETCH_EMAILS_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
