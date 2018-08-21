import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomersTable from "./components/CustomersTable";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import TableContainerComponent from "components/Tables/TableContainerComponent/TableContainerComponent";
import ButtonRow from "components/ButtonRow";
import CustomerEditor from "./containers/CustomerEditor/CustomerEditor";
import { bindActionCreators } from "redux";
import * as actions from "./CustomersActions";

export class Customers extends Component {
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
    const {
      business,
      actions: { fetchCustomers }
    } = this.props;
    fetchCustomers(business.name);
  };

  showEditors = nextProps => {
    let props = nextProps ? nextProps : this.props;
    if (props.match.params.customerId) {
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
    const { customers, fetched } = this.props;
    const { showCustomerEditor } = this.state;

    if (!fetched) {
      return "Loading...";
    }

    return (
      <div>
        <TableContainerComponent>
          <CustomersTable customers={customers} />
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
            customerId={this.props.match.params.customerId}
          />
        )}
      </div>
    );
  }
}

Customers.propTypes = {
  customers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  match: PropTypes.shape({
    params: PropTypes.shape({ customerId: PropTypes.string })
  }),
  fetched: PropTypes.bool.isRequired,
  business: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    customers: state.customers.customers,
    fetched: state.customers.fetched,
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
