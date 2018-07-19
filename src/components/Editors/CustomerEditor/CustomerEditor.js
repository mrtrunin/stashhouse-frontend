import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import store from "store";

import Editor from "../EditorComponents/Editor";
import EditorHeader from "../EditorComponents/EditorHeader";
import EditorContent from "../EditorComponents/EditorContent";
import EditorButtons from "../EditorComponents/EditorButtons";

import { TextField } from "@material-ui/core";

import updateMerchant from "api/Merchant/updateMerchant";
import createMerchant from "api/Merchant/createMerchant";
import fetchMerchant from "api/Merchant/fetchMerchant";
import deleteMerchant from "api/Merchant/deleteMerchant";
import fetchMerchants from "api/fetchMerchants";

export class CustomerEditor extends Component {
  // TODO: Handling of existing customer
  // TODO: Rename all but labels from customer to merchant

  componentDidMount = async () => {
    await store.dispatch({
      type: "RESET_MERCHANT"
    });
    await fetchMerchants();
    await this.fetchMerchant();
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.merchantId !== this.props.merchantId) {
      await this.fetchMerchant();
    }
  };

  fetchMerchant = async () => {
    let merchantId = this.props.merchantId;
    if (merchantId) {
      await fetchMerchant(merchantId);
    }
  };

  handleCustomerChange = e => {
    let field = e.target.name;
    let value = e.target.value;

    store.dispatch({
      type: "MERCHANT_UPDATE_FIELD",
      payload: value,
      field: field
    });
  };

  handleCreateOrUpdateCustomer = async () => {
    const { merchant, business } = this.props;

    if (merchant.id) {
      await updateMerchant(
        merchant.name,
        merchant.address,
        merchant.zip_code,
        merchant.city,
        merchant.country,
        merchant.phone_number,
        merchant.id
      );
    } else {
      await createMerchant(
        merchant.name,
        merchant.address,
        merchant.zip_code,
        merchant.city,
        merchant.country,
        merchant.phone_number,
        business.name
      );
    }
    await fetchMerchants();
  };

  handleDeleteCustomer = async () => {
    let merchantId = this.props.merchant.id;
    await deleteMerchant(merchantId);
    await fetchMerchants();
  };

  render() {
    const { hideCustomerEditor, merchant } = this.props;

    return (
      <Editor>
        <EditorHeader
          editedObject={merchant}
          editedObjectLabel="Customer"
          hideEditor={hideCustomerEditor}
        />

        <EditorContent>
          <TextField
            name="name"
            value={merchant.name ? merchant.name : ""}
            label="Name"
            margin="dense"
            onChange={this.handleCustomerChange}
          />

          <TextField
            name="address"
            value={merchant.address ? merchant.address : ""}
            label="Address"
            margin="dense"
            onChange={this.handleCustomerChange}
          />

          <TextField
            name="zip_code"
            value={merchant.zip_code ? merchant.zip_code : ""}
            label="Zip code"
            margin="dense"
            onChange={this.handleCustomerChange}
          />

          <TextField
            name="city"
            value={merchant.city ? merchant.city : ""}
            label="City"
            margin="dense"
            onChange={this.handleCustomerChange}
          />
          <TextField
            name="country"
            value={merchant.country ? merchant.country : ""}
            label="Country"
            margin="dense"
            onChange={this.handleCustomerChange}
          />
          <TextField
            name="phone_number"
            value={merchant.phone_number ? merchant.phone_number : ""}
            label="Phone number"
            margin="dense"
            onChange={this.handleCustomerChange}
          />
        </EditorContent>

        <EditorButtons
          editedObjectLabel="Customer"
          editedObject={merchant}
          deleteAction={this.handleDeleteCustomer}
          updateAction={this.handleCreateOrUpdateCustomer}
          createAction={this.handleCreateOrUpdateCustomer}
        />
      </Editor>
    );
  }
}

CustomerEditor.propTypes = {
  merchant: PropTypes.object,
  hideCustomerEditor: PropTypes.func.isRequired,
  merchantId: PropTypes.string
};

export default connect(store => {
  return {
    merchant: store.merchant.merchant,
    business: store.business.business
  };
})(CustomerEditor);
