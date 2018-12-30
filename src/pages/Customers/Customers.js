import React, { Component } from "react";
import PropTypes from "prop-types";
import CustomersTable from "./components/CustomersTable";
import { connect } from "react-redux";
import { Button, withStyles } from "@material-ui/core";
import Table from "components/Table/Table";
import ButtonRow from "components/Buttons/ButtonRow";
import Customer from "pages/Customer/Customer";
import { bindActionCreators } from "redux";
import * as actions from "./CustomersActions";
import { CustomersStyle } from "./CustomersStyle";
import Redirect from "react-router-dom/Redirect";

export class Customers extends Component {
  state = {
    showCustomerEditor: false,
    redirectToRoot: false
  };

  componentDidMount = () => {
    this.fetchData();
    this.showEditors();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props) {
      this.showEditors(this.props);
    }

    if (prevProps.business !== this.props.business) {
      this.fetchData();
    }

    if (prevState.redirectToRoot === true) {
      this.setState({
        redirectToRoot: false
      });
    }
  };

  fetchData = async () => {
    const {
      business,
      actions: { fetchCustomers }
    } = this.props;
    await fetchCustomers(business.name);
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
    this.setState(() => ({ showCustomerEditor: false, redirectToRoot: true }));
  };

  render() {
    const { customers, fetched, classes } = this.props;
    const { showCustomerEditor, redirectToRoot } = this.state;

    if (!fetched) {
      return "Loading...";
    }

    if (redirectToRoot) {
      return <Redirect to="/customers" />;
    }

    return (
      <div className={classes.root}>
        <Table>
          <CustomersTable customers={customers} />
        </Table>

        <ButtonRow show={!showCustomerEditor}>
          <Button
            color="primary"
            variant="contained"
            onClick={this.showCustomerEditor}
          >
            Add Customer
          </Button>
        </ButtonRow>

        {this.state.showCustomerEditor && (
          <Customer
            hideCustomerEditor={this.hideCustomerEditor}
            customerId={this.props.match.params.customerId}
          />
        )}
      </div>
    );
  }
}

Customers.propTypes = {
  classes: PropTypes.object.isRequired,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(CustomersStyle)(Customers));
