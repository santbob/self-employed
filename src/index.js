import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import rootReducer from './reducers';
import generateTestData from './testData';
import './index.css';

import * as serviceWorker from './serviceWorker';

let launchData = [];
// comment this line to not load test data.
launchData = generateTestData();
//console.log(launchData);
//creates the redux store with all routers connected
const store = createStore(rootReducer, launchData);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
