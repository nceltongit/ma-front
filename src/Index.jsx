import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import App from './components/App';
import { Provider } from 'use-http';

ReactDOM.render(
  <Router>
    <Provider url="http://localhost:8080" options={{ cachePolicy: 'no-cache' }}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
