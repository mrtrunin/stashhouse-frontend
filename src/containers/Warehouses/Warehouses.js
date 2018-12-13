import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import WarehouseTable from "./components/WarehouseTable";
import Product from "containers/Product/Product";
import Warehouse from "containers/Warehouse/Warehouse";

import { withStyles, Button, Grid } from "@material-ui/core";

import { Link, Redirect } from "react-router-dom";
import { WarehouseStyle } from "./WarehousesStyle";
import { bindActionCreators } from "redux";

import * as warehousesActions from "./WarehousesActions";
import * as productsActions from "containers/Products/ProductsActions";
import WarehouseTableFilter from "./components/WarehouseTableFilter";

import * as moment from "moment";

export class Warehouses extends Component {
  state = {
    showProductEditor: false,
    showWarehouseEditor: false,
    redirectToRoot: false,
    warehouseDate: moment().format("YYYY-MM-DD")
  };

  componentDidMount = async () => {
    await this.fetchData();
    await this.showEditors();
  };

  fetchData = async () => {
    const {
      business,
      actions: { fetchWarehouses, fetchProductsStock }
    } = this.props;

    if (business) {
      await fetchProductsStock(business.name);
      await fetchWarehouses(business.name);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (!this.props.products[0].stock) {
      this.fetchData();
    }

    if (prevProps !== this.props) {
      this.showEditors();
    }

    if (prevProps.business !== this.props.business && this.props.business) {
      this.fetchData();
    }

    if (prevState.redirectToRoot === true) {
      this.setState({
        redirectToRoot: false
      });
    }
  };

  showEditors = () => {
    const { productId, warehouseId } = this.props.match.params;

    if (productId) {
      this.handleShowProductEditor();
    }

    if (warehouseId) {
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

  handleHideProductEditor = async () => {
    this.setState({
      showProductEditor: false,
      redirectToRoot: true
    });
  };

  handleHideWarehouseEditor = () => {
    this.setState({
      showWarehouseEditor: false,
      redirectToRoot: true
    });
  };

  handleWarehouseDateChange = async e => {
    await this.setState({
      warehouseDate: e.target.value
    });

    if (await this.isDateFormat(this.state.warehouseDate)) {
      console.log("SUBMIT!");
      // TODO: filter warehouse based on the date change
    }
  };

  isDateFormat = date => {
    const regex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
    return regex.test(date);
  };

  render() {
    const { classes, products, warehouses } = this.props;
    const {
      showProductEditor,
      showWarehouseEditor,
      redirectToRoot,
      warehouseDate
    } = this.state;

    if (!this.props.fetched) {
      return <p>Loading</p>;
    }

    if (redirectToRoot) {
      return <Redirect to="/warehouses" />;
    }

    return (
      <div className={classes.root}>
        <WarehouseTableFilter
          warehouseDate={warehouseDate}
          handleWarehouseDateChange={this.handleWarehouseDateChange}
        />
        <WarehouseTable products={products} warehouses={warehouses} />

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
                  to="/warehouses/"
                  className={classes.button}
                >
                  Add New Product
                </Button>
                <Button
                  onClick={this.handleShowWarehouseEditor}
                  variant="raised"
                  color="primary"
                  component={Link}
                  to="/warehouses/"
                  className={classes.button}
                >
                  Add New Warehouse
                </Button>
              </Grid>
            </Grid>
          )}

        {showProductEditor && (
          <Product
            className={classes.root}
            productId={this.props.match.params.productId}
            hideProductEditor={this.handleHideProductEditor}
          />
        )}

        {showWarehouseEditor && (
          <Warehouse
            className={classes.root}
            warehouseId={this.props.match.params.warehouseId}
            hideWarehouseEditor={this.handleHideWarehouseEditor}
          />
        )}
      </div>
    );
  }
}

Warehouses.propTypes = {
  actions: PropTypes.object.isRequired,
  products: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
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
    products: state.products.products,
    warehouses: state.warehouses.warehouses,
    fetched: state.products.fetched,
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...warehousesActions, ...productsActions },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(WarehouseStyle)(Warehouses)
);
