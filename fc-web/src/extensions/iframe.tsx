import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import generateTheme from "../styles/theme";
import "../styles/universal.css";
import messages from "../static/messages/messages";

export function renderIframeElement(locale: string, node: React.ReactNode) {
  ReactDOM.render(
    <IntlProvider locale={locale} defaultLocale="en-US" messages={messages[locale]}>
      <ThemeProvider theme={generateTheme(locale)}>
        <CssBaseline />
        {node}
      </ThemeProvider>
    </IntlProvider>,
    document.getElementById("root")
  );
}
