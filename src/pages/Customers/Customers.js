import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CustomersTable from "./components/CustomersTable";
import { connect } from "react-redux";
import { Button, withStyles } from "@material-ui/core";
import TableBase from "components/Table/TableBase";
import ButtonRow from "components/Buttons/ButtonRow";
import Customer from "pages/Customer/Customer";
import { bindActionCreators } from "redux";
import * as actions from "./CustomersActions";
import { CustomersStyle } from "./CustomersStyle";
import Redirect from "react-router-dom/Redirect";

const Customers = props => {
  const {
    business,
    customers,
    fetched,
    classes,
    actions: { fetchCustomers }
  } = props;

  const { customerId } = props.match.params;

  const [showCustomerEditor, setShowCustomerEditor] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetchCustomers(business.name);
  }, [business]);

  useEffect(() => showEditor(), [props]);
  useEffect(() => setRedirect(false), [redirect]);

  const showEditor = () => {
    if (customerId) setShowCustomerEditor(true);
  };

  const hideCustomerEditor = () => {
    setShowCustomerEditor(false);
    setRedirect(true);
  };

  if (!fetched) {
    return "Loading...";
  }

  if (redirect) {
    return <Redirect to="/customers" />;
  }

  return (
    <div className={classes.root}>
      <TableBase>
        <CustomersTable customers={customers} />
      </TableBase>

      <ButtonRow show={!showCustomerEditor}>
        <Button
          color="primary"
          variant="contained"
          onClick={() => setShowCustomerEditor(true)}
        >
          Add Customer
        </Button>
      </ButtonRow>

      {showCustomerEditor && (
        <Customer
          hideCustomerEditor={hideCustomerEditor}
          customerId={customerId}
        />
      )}
    </div>
  );
};

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
