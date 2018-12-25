import {
  FETCH_PAYMENT,
  FETCH_PAYMENT_FULFILLED,
  PAYMENT_UPDATE_FIELD,
  FETCH_PAYMENT_REJECTED,
  RESET_PAYMENT
} from "./PaymentActions";

export default function reducer(
  state = {
    payment: {},
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case FETCH_PAYMENT: {
      return { ...state, fetching: true };
    }
    case FETCH_PAYMENT_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        payment: action.payload
      };
    }
    case PAYMENT_UPDATE_FIELD: {
      return {
        ...state,
        payment: {
          ...state.payment,
          [action.field]: action.payload
        }
      };
    }
    case FETCH_PAYMENT_REJECTED: {
      return { ...state, fetching: false, error: action.payload };
    }
    case RESET_PAYMENT: {
      return { ...state, payment: {} };
    }
    default:
  }

  return state;
}
