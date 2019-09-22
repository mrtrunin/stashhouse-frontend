import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import Editor from "components/Editor/Editor";
import EditorHeader from "components/Editor/EditorHeader";
import EditorContent from "components/Editor/EditorContent";
import EditorButtons from "components/Editor/EditorButtons";

import { TextField } from "@material-ui/core";

import * as customerActions from "./CustomerActions";
import * as customersActions from "pages/Customers/CustomersActions";
import * as warehousesActions from "pages/Warehouses/WarehousesActions";

import { bindActionCreators } from "redux";
import WarehouseSelector from "../Transaction/components/WarehouseSelector";

const Customer = props => {
  const {
    customerId,
    customer,
    business,
    hideCustomerEditor,
    warehouses,
    actions: {
      resetCustomer,
      fetchCustomer,
      fetchCustomers,
      updateCustomer,
      createCustomer,
      deleteCustomer,
      updateCustomerField,
      fetchWarehouses
    }
  } = props;

  useEffect(() => {
    resetCustomer();
    fetchWarehouses(business.name);
  }, [resetCustomer, fetchWarehouses, business]);

  useEffect(() => {
    customerId && fetchCustomer(customerId);
  }, [customerId, fetchCustomer]);

  const fetchDataAndHideEditor = async () => {
    await fetchCustomers(business.name);
    await hideCustomerEditor();
  };

  const handleCreateCustomer = async () => {
    // TODO: ADD DEFAULT WAREHOUSE SUPPORT
    await createCustomer(
      customer.name,
      customer.email,
      customer.address,
      customer.zip_code,
      customer.city,
      customer.country,
      customer.phone_number,
      customer.default_warehouse,
      business.name
    );
    await fetchDataAndHideEditor();
  };

  const handleUpdateCustomer = async () => {
    // TODO: ADD DEFAULT WAREHOUSE SUPPORT
    await updateCustomer(
      customer.name,
      customer.email,
      customer.address,
      customer.zip_code,
      customer.city,
      customer.country,
      customer.phone_number,
      customer.default_warehouse,
      customer.id
    );

    await fetchDataAndHideEditor();
  };

  const handleDeleteCustomer = async () => {
    await deleteCustomer(customer.id);
    await fetchDataAndHideEditor();
  };

  const handleCustomerChange = e => {
    if (e.target.name === "warehouseSelector") {
      e.target.value = warehouses.find(
        warehouse => warehouse.name === e.target.value
      );
      e.target.name = "default_warehouse";
    }
    updateCustomerField(e.target.value, e.target.name);
  };

  return (
    <Editor>
      <EditorHeader
        editedObject={customer}
        addNewObjectLabel="Add new customer"
        updateExistingObjectLabel="Update customer"
        hideEditor={hideCustomerEditor}
      />

      <EditorContent>
        <TextField
          name="name"
          value={customer.name ? customer.name : ""}
          label="Name"
          margin="dense"
          onChange={handleCustomerChange}
        />

        <TextField
          name="email"
          value={customer.email ? customer.email : ""}
          label="Email"
          margin="dense"
          onChange={handleCustomerChange}
        />

        <TextField
          name="address"
          value={customer.address ? customer.address : ""}
          label="Address"
          margin="dense"
          onChange={handleCustomerChange}
        />

        <TextField
          name="zip_code"
          value={customer.zip_code ? customer.zip_code : ""}
          label="Zip code"
          margin="dense"
          onChange={handleCustomerChange}
        />

        <TextField
          name="city"
          value={customer.city ? customer.city : ""}
          label="City"
          margin="dense"
          onChange={handleCustomerChange}
        />
        <TextField
          name="country"
          value={customer.country ? customer.country : ""}
          label="Country"
          margin="dense"
          onChange={handleCustomerChange}
        />
        <TextField
          name="phone_number"
          value={customer.phone_number ? customer.phone_number : ""}
          label="Phone number"
          margin="dense"
          onChange={handleCustomerChange}
        />

        <WarehouseSelector
          label="Default Warehouse"
          warehouses={warehouses}
          defaultValue="Select Default Warehouse"
          selectedWarehouse={customer.default_warehouse}
          onChange={handleCustomerChange}
        />
      </EditorContent>

      <EditorButtons
        editedObjectLabel="Customer"
        editedObject={customer}
        deleteAction={handleDeleteCustomer}
        updateAction={handleUpdateCustomer}
        createAction={handleCreateCustomer}
      />
    </Editor>
  );
};

Customer.propTypes = {
  actions: PropTypes.object.isRequired,
  customer: PropTypes.object,
  hideCustomerEditor: PropTypes.func.isRequired,
  customerId: PropTypes.string,
  business: PropTypes.object.isRequired,
  warehouses: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    customer: state.customer.customer,
    business: state.business.business,
    warehouses: state.warehouses.warehouses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...customerActions, ...customersActions, ...warehousesActions },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Customer);
