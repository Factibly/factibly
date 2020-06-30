import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import CssBaseline from "@material-ui/core/CssBaseline";
import messages from "./text/messages";
import HomeSearch from "./screens/HomeSearch";
import FactCheck from "./screens/fact-check/FactCheck";
import Bookmarks from "./screens/bookmarks/Bookmarks";
import RealUp from "./screens/real-up/RealUp";
import About from "./screens/about/About";
import Blog from "./screens/blog/FakeCheckBlog";
import Support from "./screens/support/Support";
import Login from "./screens/user/Login";
import Registration from "./screens/user/Registration";
import NavigationBar from "./screens/navigation/NavigationBar";
import Footer from "./screens/Footer";
import { changeWebsiteLanguage } from "./store/app/screenActions";

interface AppProps {
  lang: string;
  changeWebsiteLanguage: (lang: string) => object;
}

class App extends Component<AppProps> {
  render() {
    return (
      <IntlProvider locale={this.props.lang} messages={messages[this.props.lang]}>
        <BrowserRouter>
          <CssBaseline />
          <NavigationBar />
          <main style={{ minHeight: "100vh" }}>
            <Switch>
              {/* TODO avoid hardcoding the pathnames */}
              <Route exact path="/" component={HomeSearch} />
              <Route exact path="/fact-check" component={FactCheck} />
              <Route exact path="/bookmarks" component={Bookmarks} />
              <Route exact path="/real-up" component={RealUp} />
              <Route exact path="/blog" component={Blog} />
              <Route exact path="/about" component={About} />
              <Route exact path="/support" component={Support} />
              <Route exact path="/account/sign-in" component={Login} />
              <Route exact path="/account/register" component={Registration} />
            </Switch>
          </main>
          <Footer onLangChange={this.props.changeWebsiteLanguage} />
        </BrowserRouter>
      </IntlProvider>
    );
  }
}

const mapStateToProps = (state: any) => ({ lang: state.screenReducers.lang });
const mapDispatchToProps = (dispatch: any) => ({
  changeWebsiteLanguage: (lang: string) => dispatch(changeWebsiteLanguage(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
