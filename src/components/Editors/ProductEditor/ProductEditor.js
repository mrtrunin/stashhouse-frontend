import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import store from "store";

import {
  TextField,
  MenuItem,
  Select,
  Input,
  InputLabel,
  FormControl
} from "@material-ui/core";

import fetchProduct from "api/Product/fetchProduct";
import createProduct from "api/Product/createProduct";
import updateProduct from "api/Product/updateProduct";
import deleteProduct from "api/Product/deleteProduct";

import * as actions from "containers/Products/ProductsActions";

import EditorButtons from "../EditorComponents/EditorButtons";
import Editor from "../EditorComponents/Editor";
import EditorHeader from "../EditorComponents/EditorHeader";
import EditorContent from "../EditorComponents/EditorContent";
import { bindActionCreators } from "redux";

export class ProductEditor extends Component {
  componentDidMount = async () => {
    await store.dispatch({
      type: "RESET_PRODUCT"
    });
    await this.fetchProduct();
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.productId !== this.props.productId) {
      await this.fetchProduct();
    }
  };

  fetchProduct = async () => {
    let productId = this.props.productId;
    if (productId) {
      await fetchProduct(productId);
    }
  };

  handleProductChange = e => {
    store.dispatch({
      type: "PRODUCT_UPDATE_FIELD",
      payload: e.target.value,
      field: e.target.name
    });
  };

  handleCreateOrUpdateProduct = async () => {
    const {
      product,
      business,
      actions: { fetchProductsStock }
    } = this.props;

    if (product.id) {
      await updateProduct(
        product.name,
        product.ean,
        product.default_price,
        product.tax_rate,
        product.id
      );
    } else {
      await createProduct(
        product.name,
        product.ean,
        product.default_price,
        product.tax_rate,
        business.name
      );
    }
    await fetchProductsStock(business.name);
  };

  handleDeleteProduct = async () => {
    const {
      product,
      business,
      actions: { fetchProductsStock }
    } = this.props;
    await deleteProduct(product.id);
    await fetchProductsStock(business.name);
  };

  render() {
    const { product, hideProductEditor } = this.props;

    return (
      <Editor>
        <EditorHeader
          editedObject={product}
          editedObjectLabel="Product"
          hideEditor={hideProductEditor}
        />

        <EditorContent>
          <TextField
            name="name"
            value={product.name ? product.name : ""}
            label="Product Name"
            margin="dense"
            onChange={this.handleProductChange}
          />
          <TextField
            name="ean"
            value={product.ean ? product.ean : ""}
            label="EAN Code"
            margin="dense"
            onChange={this.handleProductChange}
          />
          <TextField
            name="default_price"
            value={product.default_price ? product.default_price : ""}
            label="Default Price"
            margin="dense"
            onChange={this.handleProductChange}
          />
          <FormControl>
            <InputLabel htmlFor="tax_rate">Default Tax Rate</InputLabel>
            <Select
              value={product.tax_rate ? product.tax_rate : ""}
              onChange={this.handleProductChange}
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
          editedObject={this.props.product}
          deleteAction={this.handleDeleteProduct}
          updateAction={this.handleCreateOrUpdateProduct}
          createAction={this.handleCreateOrUpdateProduct}
        />
      </Editor>
    );
  }
}

ProductEditor.propTypes = {
  actions: PropTypes.object.isRequired,
  productId: PropTypes.string,
  product: PropTypes.object,
  hideProductEditor: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    product: state.product.product,
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductEditor);
