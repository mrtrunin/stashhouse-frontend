import store from "store";

const handleReset = () => {
  store.dispatch({
    type: "TRANSACTION_STATE_RESET"
  });
};

handleReset.propTypes = {};

export default handleReset;
