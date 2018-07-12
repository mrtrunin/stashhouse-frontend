import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchBusinesses } from "api/fetchBusinesses";
import BusinessChoiceTable from "./BusinessChoiceTable";

import { connect } from "react-redux";
import store from "store";
import { Redirect } from "react-router-dom";

export class BusinessChoiceContainer extends Component {
  state = {
    redirect: false
  };

  componentDidMount = async () => {
    await fetchBusinesses();
    const { businesses } = this.props;
    if (businesses.length === 1) {
      await this.handleChooseBusiness(businesses[0]);
    }
  };

  handleChooseBusiness = async business => {
    await store.dispatch({
      type: "SELECT_BUSINESS",
      payload: business
    });

    await this.setState(() => ({
      redirect: true
    }));
  };

  render() {
    const { businesses } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/warehouse/" />;
    }

    return (
      <BusinessChoiceTable
        businesses={businesses}
        chooseBusiness={this.handleChooseBusiness}
      />
    );
  }
}

BusinessChoiceContainer.propTypes = {
  businesses: PropTypes.array.isRequired
};

export default connect(store => {
  return {
    businesses: store.businesses.businesses
  };
})(BusinessChoiceContainer);
