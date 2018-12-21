import React, { Component } from "react";
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

import * as productActions from "containers/Product/ProductActions";
import * as productsActions from "containers/Products/ProductsActions";

import EditorButtons from "components/Editors/EditorComponents/EditorButtons";
import Editor from "components/Editors/EditorComponents/Editor";
import EditorHeader from "components/Editors/EditorComponents/EditorHeader";
import EditorContent from "components/Editors/EditorComponents/EditorContent";
import { bindActionCreators } from "redux";

export class Product extends Component {
  componentDidMount = async () => {
    const {
      actions: { resetProduct }
    } = this.props;
    resetProduct();
    this.fetchProduct();
  };

  componentDidUpdate = async prevProps => {
    if (prevProps.productId !== this.props.productId) {
      await this.fetchProduct();
    }
  };

  fetchProduct = async () => {
    const {
      productId,
      actions: { fetchProduct }
    } = this.props;

    if (productId) {
      await fetchProduct(productId);
    }
  };

  handleProductChange = e => {
    const {
      actions: { updateProductField }
    } = this.props;
    updateProductField(e.target.name, e.target.value);
  };

  handleCreateOrUpdateProduct = async () => {
    const {
      product,
      business,
      actions: { fetchProductsStock, createProduct, updateProduct }
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
      actions: { fetchProductsStock, deleteProduct }
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

Product.propTypes = {
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
