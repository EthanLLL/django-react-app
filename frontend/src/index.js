import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import '../node_modules/semantic-ui-css/semantic.css';
import '../node_modules/semantic-ui-react';
import registerServiceWorker from './registerServiceWorker';
import AuthStore from './stores/AuthStore';
import PostStore from './stores/PostStore';

const stores = {
  AuthStore,
  PostStore,
}

const Root = (
  <Provider {...stores}>
    <App />
  </Provider>
)
ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();