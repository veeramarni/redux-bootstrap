# redux-bootstrap

[![Join the chat at https://gitter.im/remojansen/redux-bootstrap](https://badges.gitter.im/remojansen/redux-bootstrap.svg)](https://gitter.im/remojansen/redux-bootstrap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/remojansen/redux-bootstrap.svg?branch=master)](https://travis-ci.org/remojansen/redux-bootstrap)
[![codecov.io](https://codecov.io/github/remojansen/redux-bootstrap/coverage.svg?branch=master)](https://codecov.io/github/remojansen/redux-bootstrap?branch=master)
[![npm version](https://badge.fury.io/js/redux-bootstrap.svg)](https://badge.fury.io/js/redux-bootstrap)
[![Dependencies](https://david-dm.org/remojansen/redux-bootstrap.svg)](https://david-dm.org/remojansen/redux-bootstrap#info=dependencies)
[![img](https://david-dm.org/remojansen/redux-bootstrap/dev-status.svg)](https://david-dm.org/remojansen/redux-bootstrap/#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/remojansen/redux-bootstrap/badge.svg)](https://snyk.io/test/github/remojansen/redux-bootstrap)


[![NPM](https://nodei.co/npm/redux-bootstrap.png?downloads=true&downloadRank=true)](https://nodei.co/npm/redux-bootstrap/)
[![NPM](https://nodei.co/npm-dl/redux-bootstrap.png?months=9&height=3)](https://nodei.co/npm/redux-bootstrap/)

Bootstrapping function for [Redux](https://github.com/reactjs/redux) applications. Redux bootstrap does not generate files for you. 
It is not a project template or project scaffolding tool and it is not related with Bootstrap (responsive web apps framework).

## Why Do I Need This?
This library handles most of the common application initialization/bootstrapping that takes place every time you create a new Redux project.

When you create a new Redux project you usually need to take care of a few things:

- Install dependencies.
- Integrate the React router with Redux.
- Create a Root reducer.
- Enable DevTools is environment is development / Disable if environment is production.
- Integrate Immutable with Redux.
- Apply middleware.
- Combine reducers into a root reducer.
- Create the store.
- Sync history with store.
- Create the Root component (Provider, Router).
- Set the routes, history and store in the Root component.
- Render the Root component.

The redux-bootrap package handles all this stuff for you! 

This idea is based on the bootstrap function which is available in other modern JS framewokrs like the 
[Angular 2.0](https://angular.io/docs/ts/latest/api/platform/browser/bootstrap-function.html) or the
[Aurelia](http://aurelia.io/docs.html#/aurelia/bootstrapper/1.0.0-beta.1.2.0/doc/api/overview) bootstrapping functions.

# How Can I Use It?

Install it via npm:

```
$ npm install --save redux-bootstrap
```

The preceding command will install `redux-bootstrap` and the following dependencies:

```json
"dependencies": {
    "immutable": "^3.7.6",
    "react": "^15.0.1",
    "react-dom": "^15.0.1",
    "react-redux": "^4.4.4",
    "react-router": "^2.2.4",
    "react-router-redux": "^4.0.2",
    "redux": "^3.4.0",
    "redux-devtools": "^3.2.0",
    "redux-devtools-dock-monitor": "^1.1.1",
    "redux-devtools-log-monitor": "^1.0.10",
    "redux-immutable": "^3.0.6",
    "reselect": "^2.5.1"
}
```
 
Then use the bootstrap function in your application's entry point.

All you need to do is import you routes file, your reducers and any additional middleware 
and pass them to the bootstrap function as configuration:

```ts
import bootstrap from "redux-bootstrap";
import routes from "./routes";
import thunk from "redux-thunk";
import * as createLogger from "redux-logger";
import usersReducer from "./reducers/usersReducer";
import reposReducer from "./reducers/reposReducer";

bootstrap({
    container: "root",                    // optional
    createHistory: createBrowserHistory,  // optional
    historyOptions: {},                   // optional
    initialState: {},                     // optional
    middlewares: [thunk, createLogger()], // optional    
    render: ReactDOM.render,              // optional
    
    reducers: {
        usersReducer,
        reposReducer,
    },
    routes: routes
});
```

That's it, Routing, Immutable, DevTools are ready and you can start working on your app! 

# Where Can I Find An Example?
If you are looking for a sample application, you can refer to the [redux-bootstrap-example](https://github.com/remojansen/redux-bootstrap-example) repository.

# Using combineReducers
Redux bootstrap uses Immutable.js. The `combineReducers` function from redux don't work with immutable state but you can use the `redux-immutable` `combineReducers` function to solve this problem:

```ts
import { combineReducers } from "redux-immutable";
```

# Accessing The Store, History & Root Component
Sometimes you need to access the store, synched history or root component. For example when enabling hot loader:

```ts
const result = bootstrap({/* ... */});

if (module.hot) {
    module.hot.accept("../reducers", () => {
        const nextRootReducer = require("../reducers/index").default;
        // If you use module.exports or Babel 5, remove .default:
        // const nextRootReducer = require("../reducers/index");
        result.store.replaceReducer(nextRootReducer);
    });
}
```
The `result` object returned by the bootstrap function provides access to the store, synched history or root component.

```
interface BootstrapResult {
    store: Redux.Store,
    history: ReactRouterRedux.ReactRouterReduxHistory,
    output: any, // value returned by render()
    root: JSX.Element
}
```

# TypeScript Support
The npm package includes type definitions:

```ts
/// <reference path="node_modules/redux-bootstrap/type_definitions/redux-bootstrap/redux-bootstrap.d.ts" />
```

TypeScript is recommended if you want to enjoy the best development experience.
