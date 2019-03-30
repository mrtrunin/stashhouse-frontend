import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";

import * as warehouseActions from "pages/Warehouse/WarehouseActions";
import * as warehousesActions from "pages/Warehouses/WarehousesActions";
import * as productsActions from "pages/Products/ProductsActions";

import { TextField } from "@material-ui/core";
import EditorButtons from "components/Editor/EditorButtons";
import Editor from "components/Editor/Editor";
import EditorHeader from "components/Editor/EditorHeader";
import EditorContent from "components/Editor/EditorContent";

import { bindActionCreators } from "redux";

const Warehouse = props => {
  const {
    warehouseId,
    warehouse,
    hideWarehouseEditor,
    business,
    actions: {
      fetchWarehouse,
      fetchWarehouses,
      updateWarehouse,
      createWarehouse,
      fetchProductsStock,
      deleteWarehouse,
      updateWarehouseField,
      resetWarehouse
    }
  } = props;

  useEffect(() => {
    warehouseId ? fetchWarehouse(warehouseId) : resetWarehouse();
  }, [warehouseId]);

  const fetchDataAndHideEditor = () => {
    fetchProductsStock(business.name);
    fetchWarehouses(business.name);
    hideWarehouseEditor();
  };

  const handleCreateWarehouse = async () => {
    await createWarehouse(warehouse.name, business.name);
    await fetchDataAndHideEditor();
  };

  const handleUpdateWarehouse = async () => {
    await updateWarehouse(warehouse.name, warehouse.id);
    await fetchDataAndHideEditor();
  };

  const handleDeleteWarehouse = async () => {
    await deleteWarehouse(warehouse.id);
    await fetchDataAndHideEditor();
  };

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
          onChange={e => updateWarehouseField(e.target.name, e.target.value)}
        />
      </EditorContent>

      <EditorButtons
        editedObjectLabel="Warehouse"
        editedObject={warehouse}
        deleteAction={handleDeleteWarehouse}
        createAction={handleCreateWarehouse}
        updateAction={handleUpdateWarehouse}
      />
    </Editor>
  );
};

Warehouse.propTypes = {
  actions: PropTypes.object.isRequired,
  warehouseId: PropTypes.string,
  warehouse: PropTypes.object,
  hideWarehouseEditor: PropTypes.func.isRequired,
  business: PropTypes.object.isRequired
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
