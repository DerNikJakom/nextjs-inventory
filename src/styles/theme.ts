"use client"; //? Client only, richtig für diese File?

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7F0037",
    },
    secondary: {
      main: "#4B5563",
    },
    background: {
      default: "#F2F7F8", // Hellgrau
      paper: "#ffffff", // Weiß für Cards & Co.
    },
    text: {
      primary: "#111827", // Schwarz
      secondary: "#4b5563", // Grauton
    },
  },
});

export default theme;
