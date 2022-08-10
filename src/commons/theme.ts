import { createTheme } from "@material-ui/core/styles";
import { STAFFANY_GREY, STAFFANY_NAVY, STAFFANY_RED, STAFFANY_TURQOISE, STAFFANY_WHITE } from "./colors";

export const staffanyTheme = createTheme({
  palette: {
    primary: {
      main: STAFFANY_NAVY,
    },
    secondary: {
      main: STAFFANY_RED,
      contrastText: "white",
    },
    error: {
      main: STAFFANY_RED,
    },
    success: {
      main: STAFFANY_TURQOISE,
    },
  },
  color: {
    navy: STAFFANY_NAVY,
    red: STAFFANY_RED,
    turqouise: STAFFANY_TURQOISE,
    white: STAFFANY_WHITE,
    grey: STAFFANY_GREY,
  },
});
