import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TransactionListTable from "./TransactionListTable";

import fetchTransactions from "api/fetchTransactions";
import fetchTransactionPdf from "api/fetchTransactionPdf";
import deleteTransaction from "api/Transaction/deleteTransaction";

import { Button, Grid } from "@material-ui/core";
import TransactionCreationButtons from "./TransactionCreationButtons";

import ButtonRow from "components/ButtonRow/ButtonRow";

export class TransactionListContainer extends Component {
  state = {
    selectedTransactions: []
  };
  componentDidMount = () => {
    fetchTransactions();
  };

  handleDownloadPdf = (transactionId, transactionName, e) => {
    e.preventDefault();
    fetchTransactionPdf(transactionId, transactionName);
  };

  handleCheckbox = e => {
    if (e.target.name === "select_all" && e.target.checked) {
      this.props.transactions.forEach(transaction => {
        this.addTransactionIdToState(parseInt(transaction.id, 10));
      });
    }

    if (e.target.name === "select_all" && !e.target.checked) {
      this.props.transactions.forEach(() => {
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
    for (let transactionId of this.state.selectedTransactions) {
      await deleteTransaction(transactionId);
    }
    await fetchTransactions("DELETE TRANSACTION LOGIC");
    await this.setState({ selectedTransactions: [] });
  };

  render() {
    const { fetched } = this.props;
    const { selectedTransactions } = this.state;
    if (!fetched) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <Grid container>
          <Grid item xs={12}>
            <TransactionListTable
              transactions={this.props.transactions}
              selectedTransactions={this.state.selectedTransactions}
              onClick={this.handleDownloadPdf}
              onChange={this.handleCheckbox}
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

TransactionListContainer.propTypes = {
  transactions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  fetched: PropTypes.bool
};

export default connect(store => {
  return {
    transactions: store.transactions.transactions,
    fetched: store.transactions.fetched
  };
})(TransactionListContainer);
