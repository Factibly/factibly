import React, { Component } from "react";
import { Switch, Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "./store/rootReducer";
import { IntlProvider } from "react-intl";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import rollbar from "./libs/rollbar";
import Rollbar from "rollbar";
import AlertWrapper from "./common/Alert";
import ScrollToTop from "./common/ScrollToTop";
import Home from "./screens/Home";
import FactCheck from "./screens/fact-check/FactCheck";
import Bookmarks from "./screens/bookmarks/Bookmarks";
import Mission from "./screens/mission/Mission";
import Support from "./screens/support/Support";
import LoginForm from "./screens/user/LoginForm";
import RegistrationForm from "./screens/user/RegistrationForm";
import NavigationBar from "./screens/navigation/NavigationBar";
import Footer from "./screens/Footer";
import Legal from "./screens/legal/Legal";
import AccessibilityStatement from "./screens/legal/policies/AccessibilityStatement";
import Http404 from "./screens/Http404";
import { Theme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import generateTheme from "./styles/theme";
import { defaults } from "react-chartjs-2";
import history from "./hooks/history";
import { AlertContextProvider } from "./hooks/useAlert";
import client from "./gql/client";
import { REFRESH_TOKEN } from "./gql/mutations";
import messages from "./static/messages/messages";
import {
  HOME_PATH,
  BOOKMARKS_PATH,
  MISSION_PATH,
  SUPPORT_PATH,
  ACCOUNT_SIGN_IN_PATH,
  ACCOUNT_REGISTER_PATH,
  FACT_CHECK_CONTENT_PATH,
  LEGAL_POLICY_PATH,
  ACCESSIBILITY_PATH,
} from "./static/paths";

interface AppProps {
  locale: string;
  prefersDarkMode: boolean;
}

interface AppState {
  rollbar: Rollbar;
  theme: Theme;
}

class App extends Component<AppProps, AppState> {
  establishTheme() {
    let theme = generateTheme(this.props.locale, this.props.prefersDarkMode);
    theme = responsiveFontSizes(theme);

    defaults.global.defaultFontColor = theme.palette.text.primary;
    defaults.global.defaultFontFamily = theme.typography.fontFamily;

    return theme;
  }

  constructor(props: AppProps) {
    super(props);
    this.state = {
      rollbar,
      theme: this.establishTheme(),
    };
  }

  componentDidUpdate(prevProps: AppProps) {
    if (prevProps.prefersDarkMode !== this.props.prefersDarkMode) {
      this.setState({ theme: this.establishTheme() });
    }
  }

  async componentDidMount() {
    try {
      await client.mutate({ mutation: REFRESH_TOKEN });
    } catch (err) {}
  }

  render() {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_V3_SITE_KEY}>
        <Router history={history}>
          <ScrollToTop />
          <IntlProvider
            locale={this.props.locale}
            defaultLocale="en-US"
            messages={messages[this.props.locale]}
            // compress missing translation error messages on the console into one line
            onError={err => {
              if (err.code === "MISSING_TRANSLATION") {
                console.warn("Missing translation", err.message);
                return;
              }
              throw err;
            }}
          >
            <ThemeProvider theme={this.state.theme}>
              <AlertContextProvider>
                <CssBaseline />
                <NavigationBar />
                <main>
                  <Switch>
                    <Route exact path={HOME_PATH} component={Home} />
                    <Route exact path={FACT_CHECK_CONTENT_PATH} component={FactCheck} />
                    <Route exact path={BOOKMARKS_PATH} component={Bookmarks} />
                    <Route exact path={MISSION_PATH} component={Mission} />
                    <Route exact path={SUPPORT_PATH} component={Support} />
                    <Route exact path={ACCOUNT_SIGN_IN_PATH} component={LoginForm} />
                    <Route exact path={ACCOUNT_REGISTER_PATH} component={RegistrationForm} />
                    <Route exact path={LEGAL_POLICY_PATH} component={Legal} />
                    <Route exact path={ACCESSIBILITY_PATH} component={AccessibilityStatement} />
                    <Route path="*" component={Http404} />
                  </Switch>
                  <AlertWrapper />
                </main>
                <Footer />
              </AlertContextProvider>
            </ThemeProvider>
          </IntlProvider>
        </Router>
      </GoogleReCaptchaProvider>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  locale: state.settingsReducer.locale,
  prefersDarkMode: state.settingsReducer.prefersDarkMode,
});

export default connect(mapStateToProps)(App);
