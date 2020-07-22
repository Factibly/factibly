import React, { Component } from "react";
import { Switch, Route, Router } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import rollbar from "./config/rollbar";
import Home from "./screens/Home";
import FactCheck from "./screens/fact-check/FactCheck";
import Bookmarks from "./screens/bookmarks/Bookmarks";
import Mission from "./screens/mission/Mission";
import Support from "./screens/support/Support";
import Login from "./screens/user/Login";
import Registration from "./screens/user/Registration";
import NavigationBar from "./screens/navigation/NavigationBar";
import Footer from "./screens/Footer";
import { createMuiTheme, Theme } from "@material-ui/core/styles";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import messages from "./text/messages/messages";
import history from "./hooks/history";

interface AppProps {
  locale: string;
  prefersDarkMode: boolean;
}

let theme: Theme;
class App extends Component<AppProps> {
  constructor(props: AppProps) {
    super(props);
    this.setTheme();
    this.state = { rollbar };
  }

  componentWillUpdate() {
    // rollbar.configure({
    //   payload: {
    //     person: {
    //       id: parseInt(result?.data?.user?.id),
    //       username: result?.data?.user?.displayName,
    //       email: result?.data?.user?.email,
    //     },
    //   },
    // });
  }

  componentDidUpdate(prevProps: AppProps) {
    if (prevProps.prefersDarkMode !== this.props.prefersDarkMode) {
      this.setTheme();
      this.forceUpdate();
    }
  }

  setTheme() {
    const webkitAutofillProperty = this.props.prefersDarkMode ? "" : "0 0 0 30px transparent inset !important";
    theme = createMuiTheme({
      palette: {
        type: this.props.prefersDarkMode ? "dark" : "light",
        primary: {
          light: "#BD2489",
          main: this.props.prefersDarkMode ? "#757DE8" : "#4E4791",
          dark: "#003F5C",
          contrastText: "#FFF",
        },
        secondary: {
          main: "#FF0C3A",
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
          },
        },
        MuiMenuItem: {
          root: {
            "&:hover": {
              backgroundColor: this.props.prefersDarkMode ? grey[600] : grey[300],
            },
          },
        },
      },
    });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <IntlProvider locale={this.props.locale} defaultLocale="en" messages={messages[this.props.locale]}>
          <Router history={history}>
            <CssBaseline />
            <NavigationBar />
            <main>
              <Switch>
                {/* TODO avoid hardcoding the pathnames */}
                <Route exact path="/" component={Home} />
                <Route exact path="/bookmarks" component={Bookmarks} />
                <Route exact path="/mission" component={Mission} />
                <Route exact path="/support" component={Support} />
                <Route exact path="/account/sign-in" component={Login} />
                <Route exact path="/account/register" component={Registration} />
                <Route exact path="/content/:contentId" component={FactCheck} />
              </Switch>
            </main>
            <Footer />
          </Router>
        </IntlProvider>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state: any) => ({
  locale: state.screenReducers.locale,
  prefersDarkMode: state.screenReducers.prefersDarkMode,
});
const mapDispatchToProps = (_: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
