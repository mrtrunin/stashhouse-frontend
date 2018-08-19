import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BusinessEditor } from "containers/Businesses/containers/BusinessEditor";

export class Settings extends Component {
  render() {
    const { business } = this.props;
    return <BusinessEditor business={business} />;
  }
}

Settings.propTypes = {
  business: PropTypes.object.isRequired
};

export default connect(store => {
  return {
    business: store.business.business
  };
})(Settings);
