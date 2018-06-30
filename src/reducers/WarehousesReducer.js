export default function reducer(
  state = {
    warehouses: {},
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_WAREHOUSES": {
      return { ...state, fetching: true };
    }
    case "FETCH_WAREHOUSES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        warehouses: action.payload
      };
    }
    case "FETCH_WAREHOUSES_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
    }
    default:
  }

  return state;
}
