import * as React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import * as Redux from "redux";
import * as ReactRouterRedux from "react-router-redux";
import interfaces from "../interfaces/interfaces";

export default function getRoot(
  store: Redux.Store<any>,
  history: ReactRouterRedux.ReactRouterReduxHistory,
  routes: JSX.Element,
  routerProps?: interfaces.RouterProps
) {
    return (
      <Provider store={store}>
        <Router history={history} {...routerProps}>
            {routes}
          </Router>
      </Provider>
    );
}
