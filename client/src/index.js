import React from "react";
import ReactDom from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reducer as form } from "redux-form";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import { syncHistoryWithStore, routerReducer as routing } from "react-router-redux";
import registerServiceWorker from "./registerServiceWorker";

import "typeface-roboto";
import CssBaseline from "@material-ui/core/CssBaseline";

// translations
import {IntlProvider} from "react-intl";
import { addLocaleData } from "react-intl";
import locale_fr from "react-intl/locale-data/fr";
import messages_fr from "./assets/translations/fr";

// Import your reducers and routes here
import Welcome from "./views/Welcome";
import loginRoutes from "./routes/Authentication.jsx";
import login from "./reducers/Authentication/Login.jsx";
import register from "./reducers/Authentication/Register.jsx";

addLocaleData([...locale_fr]);

const messages = {"fr": messages_fr};
const acceptedLanguages = ["fr"];

let language = navigator.language.split(/[-_]/)[0];
language = acceptedLanguages.indexOf(language) !== -1 ? language : "fr";

const store = createStore(
  combineReducers({routing, form, login, register /* Add your reducers here */}),
  applyMiddleware(thunk),
);

const token = localStorage.getItem('token');

if (token) {
    store.dispatch({
        type: "LOGIN_SUCCESS",
        loggedIn: {
            token: token,
        }
    });
}

const history = syncHistoryWithStore(createBrowserHistory(), store);

ReactDom.render(
    <React.Fragment>
        <CssBaseline />
        <Provider store={store}>
            <IntlProvider locale={language} messages={messages[language]}>
                <Router history={history}>
                    <Switch>
                        <Route path="/" component={Welcome} strict={true} exact={true}/>
                        {loginRoutes}
                        {/* Add your routes here */}
                        <Route render={() => <h1>Ouups!</h1>}/>
                    </Switch>
                </Router>
            </IntlProvider>
        </Provider>
    </React.Fragment>,
    document.getElementById("root")
);

registerServiceWorker();
