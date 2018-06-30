import store from "store";

const handleMerchantSelect = (merchants, e) => {
  let selectedMerchant = merchants.filter(merchant => {
    return merchant.name === e.target.value;
  })[0];

  store.dispatch({
    type: "TRANSACTION_STATE_CHANGE_MERCHANT",
    payload: selectedMerchant
  });
};

handleMerchantSelect.propTypes = {};

export default handleMerchantSelect;
