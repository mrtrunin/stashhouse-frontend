import store from "store";

const showMessage = message => {
  store.dispatch({
    type: "MESSAGE_OPEN",
    payload: message
  });
};

showMessage.propTypes = {};

export default showMessage;
