import React from 'react';
import ReactDom from 'react-dom';

import App from './App';
import './assets/styles/index.css';

ReactDom.render(<App />, document.getElementById('root'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
