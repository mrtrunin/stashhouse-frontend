import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import fetchProductsStock from "api/fetchProductsStock";
import fetchWarehouses from "api/fetchWarehouses";

import WarehouseTable from "./WarehouseTable";
import ProductEditor from "components/Editors/ProductEditor";
import WarehouseEditor from "components/Editors/WarehouseEditor";

import { withStyles, Button, Grid } from "@material-ui/core";

import { Link } from "react-router-dom";

const style = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 2,
    overflowX: "auto"
  },
  flex: {
    flex: 1
  },
  buttons: {
    padding: theme.spacing.unit * 2
  },
  button: {
    marginLeft: theme.spacing.unit
  }
});

export class WarehouseContainer extends Component {
  state = {
    showProductEditor: false,
    showWarehouseEditor: false
  };

  componentDidMount = () => {
    this.fetchData();
    this.showEditors();
  };

  fetchData = () => {
    const { business } = this.props;
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

WarehouseContainer.propTypes = {
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

export default connect(store => {
  return {
    productsStock: store.productsStock.productsStock,
    warehouses: store.warehouses.warehouses,
    fetched: store.productsStock.fetched,
    business: store.business.business
  };
})(withStyles(style)(WarehouseContainer));
