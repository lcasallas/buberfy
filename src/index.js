import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducer from './reducers';
import App from './routes/App';

const initialState = {
  user: {
    // name: 'lcasallas',
  },
  trips: [
    {
      id: '1',
      address_origin: 'cr 29 77 30',
      address_final: 'Platzi, HQ',
      journey_km: '8',
      time_trip: '27min',
      cost: '12000',
      car: 'chevrolet spark',
      driver: 'Uber Contreras',
      score: '4.5',
    },
  ],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
