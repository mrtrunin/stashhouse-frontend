import { createMuiTheme } from "@material-ui/core/styles";

export const AppTheme = createMuiTheme({
  typography: {
    fontFamily:
      '-apple-system,BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;',
    fontWeight: 400,
    fontSize: 14
  },
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff"
    },
    google: {
      light: "#ffffff"
    }
  }
});
