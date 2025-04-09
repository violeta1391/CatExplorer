import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6a1b9a",
    },
    secondary: {
      main: "#ce93d8",
    },
    background: {
      default: "#f3f1f7",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: "'Nunito', 'Roboto', sans-serif",
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 16,
  },
});
