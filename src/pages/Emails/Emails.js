import React, { Component } from "react";
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

export const EmailsStyle = theme => ({
  root: {
    width: "100%"
  }
});

class Emails extends Component {
  state = {
    openEmail: false
  };

  componentDidMount = async () => {
    this.fetchEmails();
  };

  fetchEmails = async () => {
    const { transactionId } = this.props.match.params;
    const {
      business,
      actions: { fetchEmails, fetchEmailsForTransaction, fetchTransaction }
    } = this.props;

    if (transactionId) {
      await fetchEmailsForTransaction(transactionId);
      await fetchTransaction(transactionId);
    } else {
      await fetchEmails(business.name);
    }
  };

  handleOpenEmail = (transaction, e) => {
    e.preventDefault();
    this.setState(() => ({
      openEmail: true
    }));
  };

  handleCloseEmail = () => {
    this.setState(() => ({
      openEmail: false
    }));

    this.fetchEmails();
  };

  render() {
    const { emails, transaction, classes } = this.props;
    const { transactionId } = this.props.match.params;
    const { openEmail } = this.state;
    const transactionExists = transactionId > 0;

    return (
      <div className={classes.root}>
        <EmailDialog
          open={openEmail}
          handleClose={this.handleCloseEmail}
          transaction={transaction}
        />
        <EmailsTable emails={emails} />
        <ButtonRow show={transactionExists}>
          <SendEmailButton
            transaction={transaction}
            onClick={this.handleOpenEmail}
          />
        </ButtonRow>
      </div>
    );
  }
}

Emails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      transactionId: PropTypes.string
    })
  }),
  business: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  transaction: PropTypes.object,
  emails: PropTypes.array,
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
)(withStyles(EmailsStyle)(Emails));
