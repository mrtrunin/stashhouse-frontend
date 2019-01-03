import React, { Component } from "react";
import PropTypes from "prop-types";
import * as emailActions from "components/Email/EmailActions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";

export const EmailListStyle = theme => ({});

export class EmailList extends Component {
  componentDidMount = async () => {
    const {
      business,
      actions: { fetchEmails }
    } = this.props;

    await fetchEmails(business.name);
  };

  render() {
    return <div>Here come emails</div>;
  }
}

EmailList.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...emailActions }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(EmailListStyle)(EmailList));
