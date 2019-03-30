import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import WarehousesTable from "./components/WarehousesTable";
import Product from "pages/Product/Product";
import Warehouse from "pages/Warehouse/Warehouse";

import { Redirect } from "react-router";
import { bindActionCreators } from "redux";

import * as warehousesActions from "./WarehousesActions";
import * as productsActions from "pages/Products/ProductsActions";
import WarehousesTableFilter from "./components/WarehousesTableFilter";

import * as moment from "moment";
import WarehousesButtons from "./components/WarehousesButtons";
import PageContainer from "../../components/PageContainer/PageContainer";

const Warehouses = props => {
  const today = moment().format("YYYY-MM-DD");
  const {
    products,
    warehouses,
    fetched,
    business,
    actions: { fetchProductsStock, fetchWarehouses }
  } = props;

  const [showWarehouseEditor, setShowWarehouseEditor] = useState(false);
  const [showProductEditor, setShowProductEditor] = useState(false);
  const [warehouseDate, setWarehouseDate] = useState(today);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetchProductsStock(business.name);
    fetchWarehouses(business.name);
  }, [business]);
  useEffect(() => showEditors(), [props]);
  useEffect(() => setRedirect(false), [redirect]);

  const showEditors = () => {
    const { productId, warehouseId } = props.match.params;
    if (productId) setShowProductEditor(true);
    if (warehouseId) setShowWarehouseEditor(true);
  };

  const handleHideEditors = async () => {
    await setShowProductEditor(false);
    await setShowWarehouseEditor(false);
    await setRedirect(true);
  };

  const handleWarehouseDateChange = date => {
    setWarehouseDate(date.format("YYYY-MM-DD"));
    if (isDateFormat(warehouseDate))
      fetchProductsStock(business.name, warehouseDate);
  };

  const isDateFormat = date => {
    const regex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;
    return regex.test(date);
  };

  if (!fetched) return <p>Loading</p>;
  if (redirect) return <Redirect to="/warehouses" />;

  return (
    <PageContainer>
      <WarehousesTableFilter
        warehouseDate={warehouseDate}
        handleWarehouseDateChange={handleWarehouseDateChange}
      />
      <WarehousesTable products={products} warehouses={warehouses} />

      {!showProductEditor && !showWarehouseEditor && (
        <WarehousesButtons
          setShowProductEditor={setShowProductEditor}
          setShowWarehouseEditor={setShowWarehouseEditor}
        />
      )}

      {showProductEditor && (
        <Product
          productId={props.match.params.productId}
          hideProductEditor={handleHideEditors}
        />
      )}

      {showWarehouseEditor && (
        <Warehouse
          warehouseId={props.match.params.warehouseId}
          hideWarehouseEditor={handleHideEditors}
        />
      )}
    </PageContainer>
  );
};

Warehouses.propTypes = {
  actions: PropTypes.object.isRequired,
  products: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  warehouses: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  fetched: PropTypes.bool,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Warehouses);
