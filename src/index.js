import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import rootReducer from '../src/reducer/index';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';


import './style/theme.scss';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
