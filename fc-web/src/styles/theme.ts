import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";
import { grey, red } from "@material-ui/core/colors";
import locales from "../static/locales";

export default function (locale: string = "en-US", prefersDarkMode: boolean = false) {
  const webkitAutofillProperty = prefersDarkMode ? "" : "0 0 0 30px transparent inset !important";
  return createMuiTheme(
    {
      palette: {
        type: prefersDarkMode ? "dark" : "light",
        primary: {
          main: prefersDarkMode ? "#757DE8" : "#0D47A1",
          contrastText: "#FFF",
        },
        secondary: {
          main: red[700],
        },
      },
      typography: {
        fontFamily: "Doppio One, sans-serif",
      },
      overrides: {
        MuiCssBaseline: {
          "@global": {
            html: {
              height: "100%",
              fontVariantLigatures: "none",
              WebkitFontVariantLigatures: "none",
            },
            body: {
              height: "100%",
            },
            main: {
              minHeight: "100vh",
              height: "100%",
            },
            footer: {
              display: "inline-block",
              boxSizing: "border-box",
              width: "100%",
              padding: 32,
            },
            input: {
              "&:-webkit-autofill": webkitAutofillProperty,
              "&:-webkit-autofill:hover": webkitAutofillProperty,
              "&:-webkit-autofill:focus": webkitAutofillProperty,
              "&:-webkit-autofill:active": webkitAutofillProperty,
            },
            blockquote: {
              margin: 0,
              "& p": {
                padding: 16,
                background: "#EEE",
                color: "black",
                borderRadius: 4,
              },
            },
            figure: {
              marginLeft: 0,
              marginRight: 0,
            },
            kbd: {
              backgroundColor: "#EEE",
              borderRadius: 3,
              border: "1px solid #B4B4B4",
              boxShadow: "0 1px 1px rgba(0, 0, 0, .2), 0 2px 0 0 rgba(255, 255, 255, .7) inset",
              color: "#333",
              display: "inline-block",
              fontWeight: 700,
              lineHeight: 1,
              padding: "2px 4px",
              whiteSpace: "nowrap",
            },
          },
        },
        MuiMenuItem: {
          root: {
            "&:hover": {
              backgroundColor: prefersDarkMode ? grey[600] : grey[300],
            },
          },
        },
        MuiAccordionSummary: {
          root: {
            backgroundColor: grey[500],
          },
        },
        MuiTooltip: {
          tooltipPlacementBottom: {
            marginTop: "8px !important",
          },
        },
      },
    },
    locales[locale].mui
  );
}
