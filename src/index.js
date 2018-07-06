import React from 'react';
import ReactDOM from 'react-dom';
import './rem/rem';
import './reset.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './store/reducer'
import reduxThunk from 'redux-thunk'

// 中间件
let middlewares = [
  reduxThunk
];

const store=createStore(
  reducer,
  applyMiddleware( ...middlewares )
)
//let createAppStore = applyMiddleware(...middlewares)(createStore);
//   是dispatch 重要的引入方式 applyMiddleware
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider> , document.getElementById('root'));
registerServiceWorker();