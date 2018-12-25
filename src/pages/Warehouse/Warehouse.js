import React, { Component } from "react";
import PropTypes from "prop-types";

import store from "store";
import { connect } from "react-redux";

import * as warehouseActions from "pages/Warehouse/WarehouseActions";
import * as warehousesActions from "pages/Warehouses/WarehousesActions";
import * as productsActions from "pages/Products/ProductsActions";

import { TextField } from "@material-ui/core";
import EditorButtons from "components/Editors/EditorComponents/EditorButtons";
import Editor from "components/Editors/EditorComponents/Editor";
import EditorHeader from "components/Editors/EditorComponents/EditorHeader";
import EditorContent from "components/Editors/EditorComponents/EditorContent";

import { bindActionCreators } from "redux";

export class Warehouse extends Component {
  componentDidMount = () => {
    const {
      actions: { resetWarehouse }
    } = this.props;
    resetWarehouse();
    this.fetchWarehouse();
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.warehouseId !== this.props.warehouseId) {
      await this.fetchWarehouse();
    }
  };

  fetchWarehouse = async () => {
    const {
      warehouseId,
      actions: { fetchWarehouse }
    } = this.props;

    if (warehouseId) {
      fetchWarehouse(warehouseId);
    }
  };

  handleWarehouseChange = e => {
    // TODO: Extract to action
    store.dispatch({
      type: "WAREHOUSE_UPDATE_FIELD",
      payload: e.target.value,
      field: e.target.name
    });
  };

  handleCreateOrUpdateWarehouse = async () => {
    const {
      warehouse,
      business,
      actions: {
        fetchWarehouses,
        updateWarehouse,
        createWarehouse,
        fetchProductsStock
      }
    } = this.props;

    if (warehouse.id) {
      await updateWarehouse(warehouse.name, warehouse.id);
    } else {
      await createWarehouse(warehouse.name, business.name);
    }
    await fetchProductsStock(business.name);
    await fetchWarehouses(business.name);
  };

  handleDeleteWarehouse = async () => {
    const {
      warehouse,
      business,
      actions: { fetchWarehouses, deleteWarehouse, fetchProductsStock }
    } = this.props;
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
          addNewObjectLabel="Add new warehouse"
          updateExistingObjectLabel="Update warehouse"
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

Warehouse.propTypes = {
  actions: PropTypes.object.isRequired,
  warehouseId: PropTypes.string,
  warehouse: PropTypes.object,
  hideWarehouseEditor: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    warehouse: state.warehouse.warehouse,
    business: state.business.business,
    fetched: state.warehouse.fetched
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...warehouseActions, ...warehousesActions, ...productsActions },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Warehouse);
