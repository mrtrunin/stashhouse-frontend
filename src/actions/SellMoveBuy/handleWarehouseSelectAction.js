import React from "react";
import PropTypes from "prop-types";
import store from "store";

/// NOT USED YET!!!

const handleWarehouseSelectAction = (e, merchants, transactionType) => {
  let transactionTypeDispatchTypeMap = {
    BUY: "BUY_STATE_CHANGE_MERCHANT",
    SELL: "SELL_STATE_CHANGE_MERCHANT",
    MOVE: "MOVE_STATE_CHANGE_MERCHANT"
  };

  let selectedMerchant = merchants.filter(merchant => {
    return merchant.name == e.target.value;
  });

  store.dispatch({
    type: transactionTypeDispatchTypeMap[transactionType],
    payload: selectedMerchant[0]
  });
};

handleWarehouseSelectAction.propTypes = {};

export default handleWarehouseSelectAction;
