import React from "react";
import {render} from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
import {Provider as ReduxProvider} from "react-redux";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';  // needed by checkbox tree

const store = configureStore();

render(
  <ReduxProvider store={store}>
  <Router>
    <App/>
  </Router>
</ReduxProvider>, document.getElementById("app"));
