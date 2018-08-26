import React, { Component } from "react";
import PropTypes from "prop-types";
import BusinessesTable from "./components/BusinessesTable";

import { connect } from "react-redux";
import store from "store";
import { Redirect } from "react-router-dom";
import Business from "containers/Business/Business";
import { bindActionCreators } from "redux";

import * as actions from "./BusinessesActions";

export class Businesses extends Component {
  state = {
    redirect: false
  };

  componentDidMount = async () => {
    const {
      actions: { fetchBusinesses }
    } = this.props;
    await fetchBusinesses();
    const { businesses } = this.props;
    if (businesses.length === 1) {
      await this.handleChooseBusiness(businesses[0]);
    }
  };

  handleChooseBusiness = async business => {
    await store.dispatch({
      type: "FETCH_BUSINESS_FULFILLED",
      payload: business
    });

    await this.setState(() => ({
      redirect: true
    }));
  };

  render() {
    const { businesses } = this.props;
    const { redirect } = this.state;

    const noBusinesses = businesses.length === 0;

    if (redirect) {
      return <Redirect to="/warehouses/" />;
    }

    if (noBusinesses) {
      return <Business />;
    }

    return (
      <BusinessesTable
        businesses={businesses}
        chooseBusiness={this.handleChooseBusiness}
      />
    );
  }
}

Businesses.propTypes = {
  businesses: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    businesses: state.businesses.businesses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Businesses);
