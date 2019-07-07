import {
  FETCH_BUSINESSES,
  FETCH_BUSINESSES_FULFILLED,
  FETCH_BUSINESSES_REJECTED
} from "./BusinessesActions";

export default function reducer(
  state = {
    businesses: [],
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
    case FETCH_BUSINESSES: {
      return { ...state, fetching: true };
    }
    case FETCH_BUSINESSES_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        businesses: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous
      };
    }
    case FETCH_BUSINESSES_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
