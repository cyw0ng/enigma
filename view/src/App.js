import React from "react";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Entry from "./modules/entry/index";
import { SnackbarProvider } from "notistack";
import EnigmaDebug from "./utils/debug/debug";

const theme = createMuiTheme({
  props: {
    MuiButton: {
      size: "small",
    },
    MuiFilledInput: {
      margin: "dense",
    },
    MuiFormControl: {
      margin: "dense",
    },
    MuiFormHelperText: {
      margin: "dense",
    },
    MuiIconButton: {
      size: "small",
    },
    MuiInputBase: {
      margin: "dense",
    },
    MuiInputLabel: {
      margin: "dense",
    },
    MuiListItem: {
      dense: true,
    },
    MuiOutlinedInput: {
      margin: "dense",
    },
    MuiFab: {
      size: "small",
    },
    MuiTable: {
      size: "small",
    },
    MuiTextField: {
      margin: "dense",
    },
    MuiToolbar: {
      variant: "dense",
    },
  },
  overrides: {
    MuiIconButton: {
      sizeSmall: {
        marginLeft: 4,
        marginRight: 4,
        padding: 12,
      },
    },
  },
  // add original material-ui docs theme
  palette: {
    common: {
      black: "#000",
      white: "#fff",
    },
    type: "dark",
    primary: {
      main: "#009688",
      light: "rgb(51, 171, 159)",
      dark: "rgb(0, 105, 95)",
      contrastText: "#fff",
    },
    secondary: {
      main: "#00b0ff",
      light: "rgb(51, 191, 255)",
      dark: "rgb(0, 123, 178)",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    warning: {
      light: "#ffb74d",
      main: "#ff9800",
      dark: "#f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      light: "#64b5f6",
      main: "#2196f3",
      dark: "#1976d2",
      contrastText: "#fff",
    },
    success: {
      light: "#81c784",
      main: "#4caf50",
      dark: "#388e3c",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    grey: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)",
    },
    divider: "rgba(255, 255, 255, 0.12)",
    background: {
      paper: "#424242",
      default: "#121212",
      level2: "#333",
      level1: "#212121",
    },
    action: {
      active: "#fff",
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
    },
  },
});

function App() {
  EnigmaDebug.init();
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Entry />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
