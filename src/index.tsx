import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AudioPlayerProvider } from 'react-use-audio-player';
import store from './store';
import App from './App';
import './index.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <AudioPlayerProvider>
      <App />
    </AudioPlayerProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
