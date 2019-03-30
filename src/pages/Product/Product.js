import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  TextField,
  MenuItem,
  Select,
  Input,
  InputLabel,
  FormControl
} from "@material-ui/core";

import * as productActions from "pages/Product/ProductActions";
import * as productsActions from "pages/Products/ProductsActions";

import EditorButtons from "components/Editor/EditorButtons";
import Editor from "components/Editor/Editor";
import EditorHeader from "components/Editor/EditorHeader";
import EditorContent from "components/Editor/EditorContent";
import { bindActionCreators } from "redux";

const Product = props => {
  const {
    productId,
    product,
    business,
    hideProductEditor,
    actions: {
      fetchProduct,
      updateProductField,
      fetchProductsStock,
      createProduct,
      updateProduct,
      deleteProduct,
      resetProduct
    }
  } = props;

  useEffect(() => {
    resetProduct();
    fetchProduct(productId);
  }, [productId]);

  const fetchDataAndHideEditor = async () => {
    await fetchProductsStock(business.name);
    await hideProductEditor();
  };

  const handleUpdateProduct = async () => {
    await updateProduct(
      product.name,
      product.ean,
      product.default_price,
      product.tax_rate,
      product.id
    );
    await fetchDataAndHideEditor();
  };

  const handleCreateProduct = async () => {
    await createProduct(
      product.name,
      product.ean,
      product.default_price,
      product.tax_rate,
      business.name
    );
    await fetchDataAndHideEditor();
  };

  const handleDeleteProduct = async () => {
    await deleteProduct(product.id);
    await fetchDataAndHideEditor();
  };

  return (
    <Editor>
      <EditorHeader
        editedObject={product}
        addNewObjectLabel="Add new product"
        updateExistingObjectLabel="Update product"
        hideEditor={hideProductEditor}
      />

      <EditorContent>
        <TextField
          name="name"
          value={product.name ? product.name : ""}
          label="Product Name"
          margin="dense"
          onChange={e => updateProductField(e.target.name, e.target.value)}
        />
        <TextField
          name="ean"
          value={product.ean ? product.ean : ""}
          label="EAN Code"
          margin="dense"
          onChange={e => updateProductField(e.target.name, e.target.value)}
        />
        <TextField
          name="default_price"
          value={product.default_price ? product.default_price : ""}
          label="Default Price"
          margin="dense"
          onChange={e => updateProductField(e.target.name, e.target.value)}
        />
        <FormControl>
          <InputLabel htmlFor="tax_rate">Default Tax Rate</InputLabel>
          <Select
            value={product.tax_rate ? product.tax_rate : ""}
            onChange={e => updateProductField(e.target.name, e.target.value)}
            name="tax_rate"
            renderValue={value => (value * 100).toString() + "%"}
            input={<Input id="tax_rate" />}
          >
            <MenuItem value={(0.0).toString()}>0%</MenuItem>
            <MenuItem value={0.09}>9%</MenuItem>
            <MenuItem value={0.2}>20%</MenuItem>
          </Select>
        </FormControl>
      </EditorContent>

      <EditorButtons
        editedObjectLabel="Product"
        editedObject={product}
        deleteAction={handleDeleteProduct}
        createAction={handleCreateProduct}
        updateAction={handleUpdateProduct}
      />
    </Editor>
  );
};

Product.propTypes = {
  actions: PropTypes.object.isRequired,
  productId: PropTypes.string,
  product: PropTypes.object,
  hideProductEditor: PropTypes.func.isRequired,
  business: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    product: state.product.product,
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...productActions, ...productsActions },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
