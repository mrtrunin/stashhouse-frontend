import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Editor from "components/Editors/EditorComponents/Editor";
import EditorHeader from "components/Editors/EditorComponents/EditorHeader";
import EditorContent from "components/Editors/EditorComponents/EditorContent";
import EditorButtons from "components/Editors/EditorComponents/EditorButtons";

import { TextField } from "@material-ui/core";

import * as customerActions from "containers/Customers/CustomerActions";
import * as customersActions from "containers/Customers/CustomersActions";

import { bindActionCreators } from "redux";

export class CustomerEditor extends Component {
  // TODO: Handling of existing customer
  // TODO: Rename all but labels from customer to customer

  componentDidMount = async () => {
    const {
      actions: { fetchCustomers, resetCustomer }
    } = this.props;
    await resetCustomer();
    await fetchCustomers();
    await this.fetchCustomer();
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.customerId !== this.props.customerId) {
      await this.fetchCustomer();
    }
  };

  fetchCustomer = async () => {
    const {
      customerId,
      actions: { fetchCustomer }
    } = this.props;

    if (customerId) {
      await fetchCustomer(customerId);
    }
  };

  handleCustomerChange = e => {
    let field = e.target.name;
    let value = e.target.value;

    const {
      actions: { updateCustomerField }
    } = this.props;

    updateCustomerField(value, field);
  };

  handleCreateOrUpdateCustomer = async () => {
    const {
      customer,
      business,
      actions: { fetchCustomers, updateCustomer, createCustomer }
    } = this.props;

    if (customer.id) {
      await updateCustomer(
        customer.name,
        customer.address,
        customer.zip_code,
        customer.city,
        customer.country,
        customer.phone_number,
        customer.id
      );
    } else {
      await createCustomer(
        customer.name,
        customer.address,
        customer.zip_code,
        customer.city,
        customer.country,
        customer.phone_number,
        business.name
      );
    }
    await fetchCustomers();
  };

  handleDeleteCustomer = async () => {
    const {
      customer,
      actions: { fetchCustomers, deleteCustomer }
    } = this.props;
    await deleteCustomer(customer.id);
    await fetchCustomers();
  };

  render() {
    const { hideCustomerEditor, customer } = this.props;

    return (
      <Editor>
        <EditorHeader
          editedObject={customer}
          editedObjectLabel="Customer"
          hideEditor={hideCustomerEditor}
        />

        <EditorContent>
          <TextField
            name="name"
            value={customer.name ? customer.name : ""}
            label="Name"
            margin="dense"
            onChange={this.handleCustomerChange}
          />

          <TextField
            name="address"
            value={customer.address ? customer.address : ""}
            label="Address"
            margin="dense"
            onChange={this.handleCustomerChange}
          />

          <TextField
            name="zip_code"
            value={customer.zip_code ? customer.zip_code : ""}
            label="Zip code"
            margin="dense"
            onChange={this.handleCustomerChange}
          />

          <TextField
            name="city"
            value={customer.city ? customer.city : ""}
            label="City"
            margin="dense"
            onChange={this.handleCustomerChange}
          />
          <TextField
            name="country"
            value={customer.country ? customer.country : ""}
            label="Country"
            margin="dense"
            onChange={this.handleCustomerChange}
          />
          <TextField
            name="phone_number"
            value={customer.phone_number ? customer.phone_number : ""}
            label="Phone number"
            margin="dense"
            onChange={this.handleCustomerChange}
          />
        </EditorContent>

        <EditorButtons
          editedObjectLabel="Customer"
          editedObject={customer}
          deleteAction={this.handleDeleteCustomer}
          updateAction={this.handleCreateOrUpdateCustomer}
          createAction={this.handleCreateOrUpdateCustomer}
        />
      </Editor>
    );
  }
}

CustomerEditor.propTypes = {
  actions: PropTypes.object.isRequired,
  customer: PropTypes.object,
  hideCustomerEditor: PropTypes.func.isRequired,
  customerId: PropTypes.string
};

const mapStateToProps = state => {
  return {
    customer: state.customer.customer,
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...customerActions, ...customersActions },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEditor);
