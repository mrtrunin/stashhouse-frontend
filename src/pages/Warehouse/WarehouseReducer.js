import {
  FETCH_WAREHOUSE,
  FETCH_WAREHOUSE_FULFILLED,
  FETCH_WAREHOUSE_REJECTED,
  WAREHOUSE_UPDATE_FIELD,
  RESET_WAREHOUSE
} from "./WarehouseActions";

export default function reducer(
  state = {
    warehouse: {},
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case FETCH_WAREHOUSE: {
      return { ...state, fetching: true };
    }
    case FETCH_WAREHOUSE_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        warehouse: action.payload
      };
    }
    case FETCH_WAREHOUSE_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case WAREHOUSE_UPDATE_FIELD: {
      return {
        ...state,
        warehouse: {
          ...state.warehouse,
          [action.field]: action.payload
        }
      };
    }
    case RESET_WAREHOUSE: {
      return { ...state, warehouse: {} };
    }
    default:
  }

  return state;
}
