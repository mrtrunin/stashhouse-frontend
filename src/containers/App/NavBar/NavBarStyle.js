const NavBarStyle = theme => ({
  root: {},
  toolbar: {
    backgroundColor: "red"
  },
  flex: {
    flex: 1
  },
  iconLeft: {
    marginRight: theme.spacing.unit
  },
  iconWithoutText: {},
  logo: {
    textDecoration: "none",
    display: "inline",
    paddingLeft: theme.spacing.unit * 4,
    color: "white",
    fontWeight: 600,
    fontSize: "20px"
  },
  businessSelector: {
    color: "white"
  },
  smallButton: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit
  }
});

export default NavBarStyle;
