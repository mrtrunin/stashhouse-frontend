import {
  FETCH_WAREHOUSES,
  FETCH_WAREHOUSES_FULFILLED,
  FETCH_WAREHOUSES_REJECTED
} from "../Warehouses/WarehousesActions";

export default function reducer(
  state = {
    warehouses: [],
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
    case FETCH_WAREHOUSES: {
      return { ...state, fetching: true };
    }
    case FETCH_WAREHOUSES_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        warehouses: action.payload.results,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous
      };
    }
    case FETCH_WAREHOUSES_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
