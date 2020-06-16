import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import store from "./store";
import strings from "./strings";
import HomeSearch from "./screens/HomeSearch";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import Navigation from "./screens/Navigation";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./gql/GraphqlClient";

ReactDOM.render(
  <React.StrictMode>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
      crossOrigin="anonymous"
    />
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider locale={"en-US"} messages={strings["en-US"]}>
            <div>
              <Navigation />
              <Switch>
                <Route exact path="/" component={HomeSearch} />
                <Route exact path="/account/sign-in" component={Login} />
                <Route exact path="/account/register" component={Registration} />
              </Switch>
            </div>
          </IntlProvider>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
