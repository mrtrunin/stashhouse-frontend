import store from "store";

export const MESSAGE_OPEN = "MESSAGE_OPEN";
export const MESSAGE_CLOSE = "MESSAGE_CLOSE";

export const openMessage = (message, variant) => {
  return store.dispatch({
    type: MESSAGE_OPEN,
    payload: message,
    variant: variant
  });
};

export const closeMessage = () => {
  return store.dispatch({
    type: MESSAGE_CLOSE
  });
};
