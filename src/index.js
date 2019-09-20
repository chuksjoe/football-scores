import React from 'react';
import ReactDom from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore } from 'redux';

// import rootReducer from './reducers';
import App from './App';
import './assets/styles/index.css';

// const store = createStore(rootReducer);

ReactDom.render(<App />, document.getElementById('root'));

// ReactDom.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
