import { unstable_createMuiStrictModeTheme, createMuiTheme } from "@material-ui/core/styles";
import { blue, red, grey } from "@material-ui/core/colors";
import locales from "../static/locales";

const createTheme = process.env.NODE_ENV === "production" ? createMuiTheme : unstable_createMuiStrictModeTheme;

export default function (locale: string = "en-US", prefersDarkMode: boolean = false) {
  const webkitAutofillProperty = prefersDarkMode ? "" : "0 0 0 30px transparent inset !important";
  return createTheme(
    {
      palette: {
        type: prefersDarkMode ? "dark" : "light",
        primary: {
          main: prefersDarkMode ? "#206EC2" : blue[900],
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
            main: {
              minHeight: "100vh",
              height: "100%",
            },
            footer: {
              display: "inline-block",
              boxSizing: "border-box",
              width: "100%",
              padding: "32px 10%",
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
            "@media screen and (prefers-reduced-motion: reduce), (update: slow)": {
              "*": {
                animationDuration: "0.001ms !important",
                animationIterationCount: "1 !important",
                transitionDuration: "0.001ms !important",
              },
            },
            "@keyframes blink": {
              "78%": {
                color: "inherit",
                textShadow: "inherit",
              },
              "79%": {
                color: "#333",
              },
              "80%": {
                textShadow: "none",
              },
              "81%": {
                color: "inherit",
                textShadow: "inherit",
              },
              "82%": {
                color: "#333",
                textShadow: "none",
              },
              "83%": {
                color: "inherit",
                textShadow: "inherit",
              },
              "92%": {
                color: "#333",
                textShadow: "none",
              },
              "92.5%": {
                color: "inherit",
                textShadow: "inherit",
              },
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
