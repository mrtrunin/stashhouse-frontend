import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import fetchProductsStock from "api/fetchProductsStock";

import WarehouseTable from "./components/WarehouseTable";
import ProductEditor from "components/Editors/ProductEditor";
import WarehouseEditor from "components/Editors/WarehouseEditor";

import { withStyles, Button, Grid } from "@material-ui/core";

import { Link } from "react-router-dom";
import { WarehouseStyle } from "./WarehouseStyle";
import { bindActionCreators } from "redux";

import * as actions from "./WarehousesActions";

export class Warehouse extends Component {
  state = {
    showProductEditor: false,
    showWarehouseEditor: false
  };

  componentDidMount = () => {
    this.fetchData();
    this.showEditors();
  };

  fetchData = () => {
    const {
      business,
      actions: { fetchWarehouses }
    } = this.props;
    fetchProductsStock(business.name);
    fetchWarehouses(business.name);
  };

  componentDidUpdate = prevProps => {
    if (prevProps !== this.props) {
      this.showEditors(this.props);
    }

    if (prevProps.business !== this.props.business) {
      this.fetchData();
    }
  };

  showEditors = nextProps => {
    let props = nextProps ? nextProps : this.props;
    if (props.match.params.productId) {
      this.handleShowProductEditor();
    }

    if (props.match.params.warehouseId) {
      this.handleShowWarehouseEditor();
    }
  };

  handleShowProductEditor = () => {
    this.setState({
      showProductEditor: true
    });
  };

  handleShowWarehouseEditor = () => {
    this.setState({
      showWarehouseEditor: true
    });
  };

  handleHideProductEditor = () => {
    this.setState({
      showProductEditor: false
    });
  };

  handleHideWarehouseEditor = () => {
    this.setState({
      showWarehouseEditor: false
    });
  };

  render() {
    const { classes, productsStock, warehouses } = this.props;
    const { showProductEditor, showWarehouseEditor } = this.state;

    if (!this.props.fetched) {
      return <p>Loading</p>;
    }

    return (
      <div>
        <WarehouseTable productsStock={productsStock} warehouses={warehouses} />

        {!showProductEditor &&
          !showWarehouseEditor && (
            <Grid container>
              <Grid item className={classes.flex} />
              <Grid item className={classes.buttons}>
                <Button
                  onClick={this.handleShowProductEditor}
                  variant="raised"
                  color="primary"
                  component={Link}
                  to="/warehouse/"
                  className={classes.button}
                >
                  Add New Product
                </Button>
                <Button
                  onClick={this.handleShowWarehouseEditor}
                  variant="raised"
                  color="primary"
                  component={Link}
                  to="/warehouse/"
                  className={classes.button}
                >
                  Add New Warehouse
                </Button>
              </Grid>
            </Grid>
          )}

        {showProductEditor && (
          <ProductEditor
            className={classes.root}
            productId={this.props.match.params.productId}
            hideProductEditor={this.handleHideProductEditor}
          />
        )}

        {showWarehouseEditor && (
          <WarehouseEditor
            className={classes.root}
            warehouseId={this.props.match.params.warehouseId}
            hideWarehouseEditor={this.handleHideWarehouseEditor}
          />
        )}
      </div>
    );
  }
}

Warehouse.propTypes = {
  actions: PropTypes.object.isRequired,
  productsStock: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  warehouses: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  fetched: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string,
      warehouseId: PropTypes.string
    })
  }),
  business: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    productsStock: state.productsStock.productsStock,
    warehouses: state.warehouses.warehouses,
    fetched: state.productsStock.fetched,
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(WarehouseStyle)(Warehouse)
);
