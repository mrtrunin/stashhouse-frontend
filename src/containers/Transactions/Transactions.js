import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as transactionActions from "containers/Transaction/TransactionActions";
import * as transactionsActions from "./TransactionsActions";

import TransactionsTable from "./components/TransactionsTable/TransactionsTable";

import { Button, Grid, withStyles } from "@material-ui/core";
import TransactionCreationButtons from "./components/TransactionCreationButtons";
import { TransactionsStyle } from "./TransactionsStyle";

import ButtonRow from "components/ButtonRow/ButtonRow";
import TableFilter from "./components/TransactionsTable/TableFilter";

export class Transactions extends Component {
  state = {
    selectedTransactions: [],
    page: 0,
    rowsPerPage: 5,
    filteredTransactionType: "ALL"
  };
  componentDidMount = () => {
    this.fetchData();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.business !== this.props.business) {
      this.fetchData();
    }
  };

  fetchData = () => {
    const {
      business,
      actions: { fetchTransactions }
    } = this.props;
    fetchTransactions(business.name);
  };

  handleDownloadPdf = (transactionId, transactionName, e) => {
    e.preventDefault();
    const {
      business,
      actions: { fetchTransactionPdf }
    } = this.props;
    fetchTransactionPdf(transactionId, transactionName, business.name);
  };

  handleCheckbox = e => {
    const { transactions } = this.props;

    if (e.target.name === "select_all" && e.target.checked) {
      transactions.forEach(transaction => {
        this.addTransactionIdToState(parseInt(transaction.id, 10));
      });
    }

    if (e.target.name === "select_all" && !e.target.checked) {
      transactions.forEach(() => {
        this.setState({ selectedTransactions: [] });
      });
    }

    if (e.target.checked) {
      this.addTransactionIdToState(e.target.id);
    } else {
      this.removeTransactionIdFromState(e.target.id);
    }
  };

  addTransactionIdToState(transactionId) {
    this.setState(prevState => ({
      selectedTransactions: [
        ...prevState.selectedTransactions,
        parseInt(transactionId, 10)
      ]
    }));
  }

  removeTransactionIdFromState(transactionId) {
    let index = this.state.selectedTransactions.indexOf(
      parseInt(transactionId, 10)
    );
    this.setState(prevState => ({
      selectedTransactions: [
        ...prevState.selectedTransactions.slice(0, index),
        ...prevState.selectedTransactions.slice(index + 1)
      ]
    }));
  }

  handleDeleteTransactions = async () => {
    const {
      business,
      actions: { fetchTransactions, deleteTransactions }
    } = this.props;
    await deleteTransactions(this.state.selectedTransactions);
    await fetchTransactions(business.name);
    await this.setState({ selectedTransactions: [] });
  };

  handleChangePage = (e, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = e => {
    this.setState({ rowsPerPage: e.target.value });
  };

  handleFilterTransactionType = e => {
    e.persist();
    this.setState(() => ({
      filteredTransactionType: e.target.value
    }));
  };

  handleSendEmail = (transactionId, e) => {
    e.preventDefault();
    const {
      business,
      actions: { sendEmail }
    } = this.props;
    const recipients = ["lars.trunin@gmail.com", "l.arstrunin@gmail.com"];
    const subject = "Testin with Dima";
    const body = "First <br> second";

    sendEmail(business.name, transactionId, recipients, subject, body);
  };

  render() {
    const { transactions, fetched, classes } = this.props;

    const {
      selectedTransactions,
      page,
      rowsPerPage,
      filteredTransactionType
    } = this.state;

    if (!fetched) {
      return <p>Loading...</p>;
    }

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <TableFilter
              filteredTransactionType={filteredTransactionType}
              handleFilterTransactionType={this.handleFilterTransactionType}
            />
          </Grid>
          <Grid item xs={12}>
            <TransactionsTable
              transactions={transactions}
              selectedTransactions={selectedTransactions}
              onClick={this.handleDownloadPdf}
              onChange={this.handleCheckbox}
              handleChangePage={this.handleChangePage}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              page={page}
              rowsPerPage={rowsPerPage}
              filteredTransactionType={filteredTransactionType}
              handleFilterTransactionType={this.handleFilterTransactionType}
              handleSendEmail={this.handleSendEmail}
            />
          </Grid>
        </Grid>

        <ButtonRow show={selectedTransactions.length > 0}>
          <Button
            color="secondary"
            variant="raised"
            onClick={this.handleDeleteTransactions}
          >
            Delete transactions
          </Button>
        </ButtonRow>

        <TransactionCreationButtons show={selectedTransactions.length === 0} />
      </div>
    );
  }
}

Transactions.propTypes = {
  actions: PropTypes.object.isRequired,
  transactions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  business: PropTypes.object.isRequired,
  fetched: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    transactions: state.transactions.transactions,
    fetched: state.transactions.fetched,
    business: state.business.business
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...transactionActions, ...transactionsActions },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(TransactionsStyle)(Transactions)
);
