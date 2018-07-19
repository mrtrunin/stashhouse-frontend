import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BusinessEditor } from "components/Editors/BusinessEditor/BusinessEditor";

export class SettingsContainer extends Component {
  render() {
    const { business } = this.props;
    return <BusinessEditor business={business} />;
  }
}

SettingsContainer.propTypes = {
  business: PropTypes.object.isRequired
};

export default connect(store => {
  return {
    business: store.business.business
  };
})(SettingsContainer);
