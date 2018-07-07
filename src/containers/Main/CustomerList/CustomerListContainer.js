import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomerListTable from "./CustomerListTable";
import fetchMerchants from "api/fetchMerchants";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import TableContainerComponent from "components/Tables/TableContainerComponent/TableContainerComponent";
import ButtonRow from "components/ButtonRow";
import CustomerEditor from "components/Editors/CustomerEditor";

export class CustomerListContainer extends Component {
  state = {
    showCustomerEditor: false
  };

  componentDidMount = () => {
    this.fetchData();
    this.showEditors();
  };

  componentDidUpdate = prevProps => {
    if (prevProps !== this.props) {
      this.showEditors(this.props);
    }

    if (prevProps.business !== this.props.business) {
      this.fetchData();
    }
  };

  fetchData = () => {
    const { business } = this.props;
    fetchMerchants(business.name);
  };

  showEditors = nextProps => {
    let props = nextProps ? nextProps : this.props;
    if (props.match.params.merchantId) {
      this.showCustomerEditor();
    }
  };

  showCustomerEditor = () => {
    this.setState(() => ({ showCustomerEditor: true }));
  };

  hideCustomerEditor = () => {
    this.setState(() => ({ showCustomerEditor: false }));
  };

  render() {
    const { merchants, fetched } = this.props;
    const { showCustomerEditor } = this.state;

    if (!fetched) {
      return "Loading...";
    }

    return (
      <div>
        <TableContainerComponent>
          <CustomerListTable merchants={merchants} />
        </TableContainerComponent>

        <ButtonRow show={!showCustomerEditor}>
          <Button
            color="primary"
            variant="raised"
            onClick={this.showCustomerEditor}
          >
            Add Customer
          </Button>
        </ButtonRow>

        {this.state.showCustomerEditor && (
          <CustomerEditor
            hideCustomerEditor={this.hideCustomerEditor}
            merchantId={this.props.match.params.merchantId}
          />
        )}
      </div>
    );
  }
}

CustomerListContainer.propTypes = {
  merchants: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  match: PropTypes.shape({
    params: PropTypes.shape({ merchantId: PropTypes.string })
  }),
  fetched: PropTypes.bool.isRequired,
  business: PropTypes.object.isRequired
};

export default connect(store => {
  return {
    merchants: store.merchants.merchants,
    fetched: store.merchants.fetched,
    business: store.user.business
  };
})(CustomerListContainer);
