import { MESSAGE_OPEN, MESSAGE_CLOSE } from "./MessageActions";

export default function reducer(
  state = {
    message: "",
    open: false,
    variant: ""
  },
  action
) {
  switch (action.type) {
    case MESSAGE_OPEN: {
      return {
        ...state,
        message: action.payload,
        open: true,
        variant: action.variant
      };
    }
    case MESSAGE_CLOSE: {
      return {
        ...state,
        open: false
      };
    }
    default:
  }

  return state;
}
