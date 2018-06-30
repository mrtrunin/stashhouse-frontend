import store from "store";

const handleMerchantSelectAction = (e, merchants, transactionType) => {
  let transactionTypeDispatchTypeMap = {
    BUY: "BUY_STATE_CHANGE_MERCHANT",
    SELL: "SELL_STATE_CHANGE_MERCHANT",
    MOVE: "MOVE_STATE_CHANGE_MERCHANT"
  };

  let selectedMerchant = merchants.filter(merchant => {
    return merchant.name === e.target.value;
  });

  store.dispatch({
    type: transactionTypeDispatchTypeMap[transactionType],
    payload: selectedMerchant[0]
  });
};

handleMerchantSelectAction.propTypes = {};

export default handleMerchantSelectAction;
