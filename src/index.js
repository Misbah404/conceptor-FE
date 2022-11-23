import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import HTTPService from './services/http'
import store from './store'

import './assets/css/index.css';
import './assets/css/global.scss';
import 'antd/dist/antd.css';

import AppRoute from './routes'

global.services = {
  http: HTTPService,
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Route component={AppRoute} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
