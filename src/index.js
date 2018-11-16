import React from 'react';
import ReactDOM from 'react-dom';

// SCSS
import './scss/components/App.scss';
import 'node-snackbar/src/sass/snackbar.sass';

// Main component
import App from './js/components/App';

// React Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Reducers & Middlewares
import reducers from './js/reducers';
import middlewares from './js/middlewares';

const store = createStore(reducers, middlewares);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
