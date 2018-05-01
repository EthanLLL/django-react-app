import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';
import '../node_modules/semantic-ui-css/semantic.css';
import '../node_modules/semantic-ui-react';
import '../node_modules/nprogress/nprogress.css';
import registerServiceWorker from './registerServiceWorker';
import AuthStore from './stores/AuthStore';
import PostStore from './stores/PostStore';
import CommonStore from './stores/CommonStore';
import { HashRouter } from 'react-router-dom';
import 'element-theme-default';

const stores = {
  AuthStore,
  PostStore,
  CommonStore
}

const Root = (
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();