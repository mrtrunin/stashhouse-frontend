export const TransactionsTableStyle = theme => ({
  root: {
    overflowX: "auto"
  },
  unpaidAmount: {
    color: "red",
    textDecoration: "none"
  },
  overpaidAmount: {
    color: "blue"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: theme.spacing.unit
  }
});
