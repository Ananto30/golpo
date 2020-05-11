import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import { Provider } from "mobx-react";

import commonStore from "./store/commonStore";
import activityStore from "./store/activityStore";

import 'mobx-react-lite/batchingForReactDom'

const stores = {
  commonStore,
  activityStore,
};

// For easier debugging
window._____APP_STATE_____ = stores;

ReactDOM.render(
  <Provider {...stores}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
