import React, { Component } from "react";
import PropTypes from "prop-types";

import store from "store";
import { connect } from "react-redux";

import * as warehouseActions from "containers/Warehouse/WarehouseActions";
import * as warehousesActions from "containers/Warehouse/WarehousesActions";
import * as productsActions from "containers/Products/ProductsActions";

import { TextField } from "@material-ui/core";
import EditorButtons from "../EditorComponents/EditorButtons";
import Editor from "../EditorComponents/Editor";
import EditorHeader from "../EditorComponents/EditorHeader";
import EditorContent from "../EditorComponents/EditorContent";

import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";

export class WarehouseEditor extends Component {
  state = {
    redirectToRoot: false
  };

  componentDidMount = async () => {
    // TODO: Extract to action
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
    const {
      warehouseId,
      warehouse,
      actions: { fetchWarehouse }
    } = this.props;

    if (warehouseId) {
      await fetchWarehouse(warehouseId);
      if (!warehouse.id) {
        this.setState({
          redirectToRoot: true
        });
      }
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
    const { redirectToRoot } = this.state;

    if (redirectToRoot) {
      return <Redirect to="/warehouse" />;
    }

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

const mapStateToProps = state => {
  return {
    warehouse: state.warehouse.warehouse,
    business: state.business.business
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

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseEditor);
