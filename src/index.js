import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { addLocaleData } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import messages_en from "./translations/en.json";
import configureStore from './configureStore'


addLocaleData([...locale_en]);

const messages = {
    'en': messages_en
};

const language = navigator.language.split(/[-_]/)[0];

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <IntlProvider locale={language} messages={messages[language]}>
            <App />
        </IntlProvider>
    </Provider>
    ,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
