import store from "store";

const closeMessage = () => {
  store.dispatch({
    type: "MESSAGE_CLOSE"
  });
};

closeMessage.propTypes = {};

export default closeMessage;
