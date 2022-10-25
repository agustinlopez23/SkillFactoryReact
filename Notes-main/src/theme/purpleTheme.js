import { createTheme } from "@mui/material";
import { purple, red } from "@mui/material/colors";

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: "#2b4c7e",
    },
    secondary: {
      main: "#606d80",
    },
    error: {
      main: red.A400,
    },
  },
});
