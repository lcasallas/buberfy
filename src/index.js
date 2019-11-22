import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import App from './routes/App';

const initialState = {
  user: {},
  favorites: [],
  mytrips: [],
  historytrips: [
    {
      origin: 'Platzi 72',
      destino: 'Centro Comercial Titán Plaza, Avenida Boyacá, Bogotá, Colombia',
      originLat: 4.6560663,
      originLng: -74.05740309999999,
      destinationLat: 4.694707999999999,
      destinationLng: -74.08618799999999,
      distance: '6,3 km',
      duration: '17 min',
      estimateRate: 6344,
    },
    {
      originLat: 4.668194,
      originLng: -74.0530149,
      destinationLat: 4.6514282,
      destinationLng: -74.12631499999998,
      destino: 'Multiplaza, Centro Comercial, Bogotá, Colombia',
      distance: '13,2 km',
      duration: '31 min',
      estimateRate: 26312,
    },
  ],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk)),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
