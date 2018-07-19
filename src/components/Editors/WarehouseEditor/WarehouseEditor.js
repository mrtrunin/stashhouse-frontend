import React, { Component } from "react";
import PropTypes from "prop-types";

import store from "store";
import { connect } from "react-redux";

import fetchWarehouse from "api/Warehouse/fetchWarehouse";
import createWarehouse from "api/Warehouse/createWarehouse";
import updateWarehouse from "api/Warehouse/updateWarehouse";
import deleteWarehouse from "api/Warehouse/deleteWarehouse";
import fetchProductsStock from "api/fetchProductsStock";
import fetchWarehouses from "api/fetchWarehouses";

import { TextField } from "@material-ui/core";
import EditorButtons from "../EditorComponents/EditorButtons";
import Editor from "../EditorComponents/Editor";
import EditorHeader from "../EditorComponents/EditorHeader";
import EditorContent from "../EditorComponents/EditorContent";

export class WarehouseEditor extends Component {
  componentDidMount = async () => {
    await store.dispatch({
      type: "RESET_WAREHOUSE"
    });
    await this.fetchWarehouse();
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.warehouseId !== this.props.warehouseId) {
      await this.fetchWarehouse();
    }
  };

  fetchWarehouse = async () => {
    let warehouseId = this.props.warehouseId;
    if (warehouseId) {
      await fetchWarehouse(warehouseId);
    }
  };

  handleWarehouseChange = e => {
    store.dispatch({
      type: "WAREHOUSE_UPDATE_FIELD",
      payload: e.target.value,
      field: e.target.name
    });
  };

  handleCreateOrUpdateWarehouse = async () => {
    const { warehouse, business } = this.props;

    if (warehouse.id) {
      await updateWarehouse(warehouse.name, warehouse.id);
    } else {
      await createWarehouse(warehouse.name, business.name);
    }
    await fetchProductsStock(business.name);
    await fetchWarehouses(business.name);
  };

  handleDeleteWarehouse = async () => {
    const { warehouse, business } = this.props;
    await deleteWarehouse(warehouse.id);
    await fetchProductsStock(business.name);
    await fetchWarehouses(business.name);
  };

  render() {
    const { warehouse, hideWarehouseEditor } = this.props;
    return (
      <Editor>
        <EditorHeader
          editedObject={warehouse}
          editedObjectLabel="Warehouse"
          hideEditor={hideWarehouseEditor}
        />

        <EditorContent>
          <TextField
            name="name"
            value={warehouse.name ? warehouse.name : ""}
            label="Warehouse Name"
            margin="dense"
            onChange={this.handleWarehouseChange}
          />
        </EditorContent>

        <EditorButtons
          editedObjectLabel="Warehouse"
          editedObject={warehouse}
          deleteAction={this.handleDeleteWarehouse}
          updateAction={this.handleCreateOrUpdateWarehouse}
          createAction={this.handleCreateOrUpdateWarehouse}
        />
      </Editor>
    );
  }
}

WarehouseEditor.propTypes = {
  warehouseId: PropTypes.string,
  warehouse: PropTypes.object,
  hideWarehouseEditor: PropTypes.func.isRequired
};

export default connect(store => {
  return {
    warehouse: store.warehouse.warehouse,
    business: store.business.business
  };
})(WarehouseEditor);
