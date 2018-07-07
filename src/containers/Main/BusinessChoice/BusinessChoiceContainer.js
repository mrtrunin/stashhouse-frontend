import React, { Component } from "react";
import PropTypes from "prop-types";
import { fetchBusinesses } from "api/fetchBusinesses";
import BusinessChoiceTable from "./BusinessChoiceTable";

import { connect } from "react-redux";
import store from "store";

export class BusinessChoiceContainer extends Component {
  static propTypes = {};

  componentDidMount = async () => {
    await fetchBusinesses();
  };

  handleChooseBusiness = business => {
    store.dispatch({
      type: "SELECT_BUSINESS",
      payload: business
    });
  };

  render() {
    const { businesses } = this.props;

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
