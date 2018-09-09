const MainStyle = theme => ({
  root: {
    marginTop: theme.spacing.unit * 8,
    padding: theme.spacing.unit * 2
  },
  font: theme.typography,
  landingPage: {
    backgroundColor: theme.palette.primary.main,
    minHeight: "600px"
  },
  content: {
    display: "flex",
    justifyContent: "center"
  }
});

export default MainStyle;
