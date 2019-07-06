import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as emailActions from "components/Email/EmailActions";
import * as transactionActions from "pages/Transaction/TransactionActions";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import EmailsTable from "./EmailsTable";

import ButtonRow from "components/Buttons/ButtonRow";
import EmailDialog from "components/Email/EmailDialog";
import SendEmailButton from "pages/Transactions/components/TransactionsTable/SendEmailButton";
import { withStyles } from "@material-ui/core";

const style = theme => ({
  root: {
    width: "100%"
  }
});

const Emails = props => {
  const {
    emails,
    transaction,
    classes,
    business,
    actions: { fetchEmails, fetchEmailsForTransaction, fetchTransaction }
  } = props;
  const { transactionId } = props.match.params;
  const [openEmail, setOpenEmail] = useState(false);
  const transactionExists = transactionId > 0;

  useEffect(() => {
    fetchEmailActions();
  }, []);

  const fetchEmailActions = async () => {
    if (transactionId) {
      await fetchEmailsForTransaction(transactionId);
      await fetchTransaction(transactionId);
    } else {
      await fetchEmails(business.name);
    }
  };

  const handleOpenEmail = e => {
    e.preventDefault();
    setOpenEmail(true);
  };

  const handleCloseEmail = async e => {
    e.preventDefault();
    await setOpenEmail(false);
    await fetchEmailActions();
  };

  return (
    <div className={classes.root}>
      <EmailDialog
        open={openEmail}
        handleClose={handleCloseEmail}
        transaction={transaction}
      />
      <EmailsTable emails={emails} />
      <ButtonRow show={transactionExists}>
        <SendEmailButton transaction={transaction} onClick={handleOpenEmail} />
      </ButtonRow>
    </div>
  );
};

Emails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      transactionId: PropTypes.string
    })
  }),
  business: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  transaction: PropTypes.object,
  emails: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    business: state.business.business,
    transaction: state.transaction.transaction,
    emails: state.emails.emails
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      { ...emailActions, ...transactionActions },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Emails));
