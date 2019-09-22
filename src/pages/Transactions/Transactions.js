import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as transactionActions from "pages/Transaction/TransactionActions";
import * as transactionsActions from "./TransactionsActions";

import TransactionsTable from "./components/TransactionsTable/TransactionsTable";

import { Button } from "@material-ui/core";
import TransactionCreationButtons from "./components/TransactionCreationButtons";

import ButtonRow from "components/Buttons/ButtonRow";
import TableFilter from "./components/TransactionsTable/TableFilter";
import EmailDialog from "components/Email/EmailDialog";
import PageContainer from "../../components/PageContainer/PageContainer";

const Transactions = props => {
  const {
    business,
    transactions,
    count,
    next,
    previous,
    fetched,
    actions: {
      fetchTransactions,
      fetchTransactionPdf,
      deleteTransactions,
      fetchTransactionsByPageUrl
    }
  } = props;

  const [page, setPage] = useState(0);
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [filteredTransactionType, setFilteredTransactionType] = useState("ALL");
  const [openEmail, setOpenEmail] = useState(false);
  const [transaction, setTransaction] = useState({});

  useEffect(() => {
    fetchTransactions(business.name);
  }, [business, fetchTransactions]);

  const handleDownloadPdf = (transactionId, transactionName, e) => {
    e.preventDefault();
    fetchTransactionPdf(transactionId, transactionName, business.name);
  };

  const handleCheckbox = e => {
    if (e.target.name === "select_all" && e.target.checked) {
      transactions.forEach(transaction => {
        addTransactionIdToState(parseInt(transaction.id, 10));
      });
      return;
    }

    if (e.target.name === "select_all" && !e.target.checked) {
      transactions.forEach(() => {
        setSelectedTransactions([]);
      });
      return;
    }

    if (e.target.checked) {
      addTransactionIdToState(e.target.id);
    } else {
      removeTransactionIdFromState(e.target.id);
    }
  };

  const addTransactionIdToState = transactionId => {
    setSelectedTransactions(selectedTransactions => [
      ...selectedTransactions,
      parseInt(transactionId, 10)
    ]);
  };

  const removeTransactionIdFromState = transactionId => {
    let index = selectedTransactions.indexOf(parseInt(transactionId, 10));
    setSelectedTransactions(selectedTransactions => [
      ...selectedTransactions.slice(0, index),
      ...selectedTransactions.slice(index + 1)
    ]);
  };

  const handleDeleteTransactions = async () => {
    await deleteTransactions(selectedTransactions);
    await fetchTransactions(business.name);
    await setSelectedTransactions([]);
  };

  const handleFilterTransactionType = async e => {
    e.persist();
    const transactionType = e.target.value;
    await fetchTransactions(business.name, transactionType);
    await setFilteredTransactionType(transactionType);
  };

  const handleOpenEmail = (transaction, e) => {
    e.preventDefault();
    setOpenEmail(true);
    setTransaction(transaction);
  };

  const handleChangePage = async (e, nextPage) => {
    await fetchTransactionsByPageUrl(nextPage > page ? next : previous);
    await setPage(nextPage);
  };

  const handleCloseEmail = () => {
    setOpenEmail(false);
  };

  if (!fetched) {
    return <p>Loading...</p>;
  }

  return (
    <PageContainer>
      <EmailDialog
        open={openEmail}
        handleClose={handleCloseEmail}
        transaction={transaction}
      />

      <TableFilter
        filteredTransactionType={filteredTransactionType}
        handleFilterTransactionType={handleFilterTransactionType}
      />

      <TransactionsTable
        transactions={transactions}
        count={count}
        selectedTransactions={selectedTransactions}
        onClick={handleDownloadPdf}
        onChange={handleCheckbox}
        handleChangePage={handleChangePage}
        page={page}
        filteredTransactionType={filteredTransactionType}
        handleFilterTransactionType={handleFilterTransactionType}
        handleOpenEmail={handleOpenEmail}
      />

      <ButtonRow show={selectedTransactions.length > 0}>
        <Button
          color="secondary"
          variant="contained"
          onClick={handleDeleteTransactions}
        >
          Delete transactions
        </Button>
      </ButtonRow>

      <TransactionCreationButtons show={selectedTransactions.length === 0} />
    </PageContainer>
  );
};

Transactions.propTypes = {
  actions: PropTypes.object.isRequired,
  transactions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  business: PropTypes.object.isRequired,
  fetched: PropTypes.bool,
  count: PropTypes.number.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string
};

const mapStateToProps = state => {
  return {
    transactions: state.transactions.transactions,
    count: state.transactions.count,
    next: state.transactions.next,
    previous: state.transactions.previous,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
