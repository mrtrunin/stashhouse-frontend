export const LandingPageStyle = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  welcomeText: {
    textAlign: "center",
    align: "center",
    color: "white",
    paddingTop: theme.spacing.unit * 18
  },
  title: {
    fontWeight: "400",
    fontSize: 48,
    lineHeight: 1.2,
    margin: theme.spacing.unit
  },
  subTitle: {
    fontWeight: "200",
    fontSize: 30,
    lineHeight: 1,
    marginBottom: theme.spacing.unit * 5
  }
});
