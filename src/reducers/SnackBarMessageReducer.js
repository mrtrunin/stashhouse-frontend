export default function reducer(
  state = {
    message: "",
    open: false
  },
  action
) {
  switch (action.type) {
    case "MESSAGE_OPEN": {
      return { ...state, message: action.payload, open: true };
    }
    case "MESSAGE_CLOSE": {
      return {
        ...state,
        open: false
      };
    }
    default:
  }

  return state;
}
