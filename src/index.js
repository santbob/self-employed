import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import setupStore, { history } from './setupStore';
import generateTestData from './testData';
import './index.css';
let launchData = [];

// comment this line to not load test data.
launchData = generateTestData();
//console.log(launchData);
//creates the redux store with all routers connected
const store = setupStore(launchData);

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
