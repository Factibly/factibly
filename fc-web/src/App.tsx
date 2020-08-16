import React, { Component } from "react";
import { Switch, Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "./store/rootReducer";
import { IntlProvider } from "react-intl";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import rollbar from "./libs/rollbar";
import AlertWrapper from "./common/Alert";
import Home from "./screens/Home";
import FactCheck from "./screens/fact-check/FactCheck";
import Bookmarks from "./screens/bookmarks/Bookmarks";
import Mission from "./screens/mission/Mission";
import Support from "./screens/support/Support";
import Login from "./screens/user/Login";
import Registration from "./screens/user/Registration";
import NavigationBar from "./screens/navigation/NavigationBar";
import Footer from "./screens/Footer";
import Http404 from "./screens/Http404";
import { Theme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import generateTheme from "./styles/theme";
import { defaults } from "react-chartjs-2";
import history from "./hooks/history";
import { AlertContextProvider } from "./hooks/useAlert";
import messages from "./static/messages/messages";
import {
  HOME_PATH,
  BOOKMARKS_PATH,
  MISSION_PATH,
  SUPPORT_PATH,
  ACCOUNT_SIGN_IN_PATH,
  ACCOUNT_REGISTER_PATH,
  FACT_CHECK_PATH,
} from "./static/paths";
import client from "./gql/client";
import { REFRESH_TOKEN } from "./gql/mutations";

interface AppProps {
  locale: string;
  prefersDarkMode: boolean;
}

class App extends Component<AppProps> {
  static theme: Theme;

  constructor(props: AppProps) {
    super(props);
    this.setTheme();
    this.state = { rollbar };
  }

  setTheme() {
    App.theme = generateTheme(this.props.locale, this.props.prefersDarkMode);
    App.theme = responsiveFontSizes(App.theme);

    defaults.global.defaultFontColor = App.theme.palette.text.primary;
    defaults.global.defaultFontFamily = App.theme.typography.fontFamily;
  }

  componentDidUpdate(prevProps: AppProps) {
    if (prevProps.prefersDarkMode !== this.props.prefersDarkMode) {
      this.setTheme();
      this.forceUpdate();
    }
  }

  async componentWillMount() {
    try {
      await client.mutate({ mutation: REFRESH_TOKEN });
    } catch (err) {}
  }

  render() {
    return (
      <Router history={history}>
        <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_V3_SITE_KEY}>
          <IntlProvider
            locale={this.props.locale}
            defaultLocale="en-US"
            messages={messages[this.props.locale]}
            // So that missing translation errors in console take up only one line
            onError={err => {
              if (err.code === "MISSING_TRANSLATION") {
                console.warn("Missing translation", err.message);
                return;
              }
              throw err;
            }}
          >
            <ThemeProvider theme={App.theme}>
              <AlertContextProvider>
                <CssBaseline />
                <NavigationBar />
                <main>
                  <Switch>
                    <Route exact path={HOME_PATH} component={Home} />
                    <Route exact path={FACT_CHECK_PATH} component={FactCheck} />
                    <Route exact path={BOOKMARKS_PATH} component={Bookmarks} />
                    <Route exact path={MISSION_PATH} component={Mission} />
                    <Route exact path={SUPPORT_PATH} component={Support} />
                    <Route exact path={ACCOUNT_SIGN_IN_PATH} component={Login} />
                    <Route exact path={ACCOUNT_REGISTER_PATH} component={Registration} />
                    <Route path="*" component={Http404} />
                  </Switch>
                  <AlertWrapper />
                </main>
                <Footer />
              </AlertContextProvider>
            </ThemeProvider>
          </IntlProvider>
        </GoogleReCaptchaProvider>
      </Router>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  locale: state.settingsReducer.locale,
  prefersDarkMode: state.settingsReducer.prefersDarkMode,
});

export default connect(mapStateToProps)(App);
