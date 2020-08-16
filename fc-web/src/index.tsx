import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";
import { ApolloProvider } from "@apollo/client";
import client from "./gql/client";
import firebase from "./libs/firebase";
import App from "./App";
import "./styles/index.css";
import "./styles/universal.css";

if (process.env.NODE_ENV === "production" && navigator.userAgent !== "ReactSnap") {
  firebase.analytics();
}

const root = document.getElementById("root");
const FakeCheck = (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ApolloProvider>
  </React.StrictMode>
);
if (root?.hasChildNodes()) {
  ReactDOM.hydrate(FakeCheck, root);
} else {
  ReactDOM.render(FakeCheck, root);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
