import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import BusinessesTable from "./components/BusinessesTable";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Business from "pages/Business/Business";
import { bindActionCreators } from "redux";

import * as businessesActions from "./BusinessesActions";
import * as businessActions from "pages/Business/BusinessActions";

const Businesses = ({
  businesses,
  actions: { fetchBusinesses, chooseBusiness }
}) => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => fetchBusinesses, [fetchBusinesses]);

  const handleChooseBusiness = useCallback(
    async business => {
      chooseBusiness(business);
      setRedirect(true);
    },
    [chooseBusiness]
  );

  useEffect(() => {
    if (businesses.length === 1) {
      handleChooseBusiness(businesses[0]);
    }
  }, [businesses, handleChooseBusiness]);

  if (redirect) {
    return <Redirect to="/warehouses/" />;
  }

  if (businesses.length === 0) {
    return <Business />;
  }

  return (
    <BusinessesTable
      businesses={businesses}
      chooseBusiness={handleChooseBusiness}
    />
  );
};

Businesses.propTypes = {
  businesses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    businesses: state.businesses.businesses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...businessesActions, ...businessActions },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Businesses);
