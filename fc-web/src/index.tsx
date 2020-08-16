import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import { Provider as ReduxProvider } from "react-redux";
import store from "./store/store";
import { ApolloProvider } from "@apollo/client";
import client from "./gql/client";
import App from "./App";
import "./index.css";
import "./styles/desktop.css";
import "./styles/mobile.css";
import "./styles/universal.css";

if (process.env.NODE_ENV === "production" && navigator.userAgent !== "ReactSnap") {
  var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ?? "",
    authDomain: "fake-check-web.firebaseapp.com",
    databaseURL: "https://fake-check-web.firebaseio.com",
    projectId: "fake-check-web",
    storageBucket: "fake-check-web.appspot.com",
    messagingSenderId: "495281003374",
    appId: "1:495281003374:web:6bdc06b56218afde1dbf7f",
    measurementId: "G-VX233Z3NTQ",
  };
  firebase.initializeApp(firebaseConfig);
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
