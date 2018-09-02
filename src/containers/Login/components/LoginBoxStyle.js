export const LoginBoxStyle = theme => ({
  root: {
    width: theme.spacing.unit * 46,
    marginTop: theme.spacing.unit * 4,
    overflowX: "auto"
  },
  header: {
    marginTop: theme.spacing.unit * 2,
    textAlign: "center"
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  heading: {
    fontWeight: 300,
    marginTop: theme.spacing.unit * 5,
    textAlign: "center"
  },
  googleButton: {
    padding: "8px 24px",
    minWidth: "112px",
    fontSize: "0.9375rem",
    minHeight: "40px",
    color: "#fff",
    boxShadow:
      "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxSizing: "border-box",
    lineHeight: "1.4em",
    fontWeight: "500",
    borderRadius: "4px",
    textTransform: "uppercase",
    cursor: "pointer",
    margin: "0",
    border: "0",
    display: "inline-flex",
    outline: "none",
    userSelect: "none",
    alignItems: "center",
    verticalAlign: "middle",
    justifyContent: "center",
    textDecoration: "none"
  }
});
