import axios from 'axios';

const URL_API = 'http://localhost:3000/';

export const setLogin = payload => ({
  type: 'SET_LOGIN',
  payload,
});

export const setLogout = payload => ({
  type: 'SET_LOGOUT',
  payload,
});

export const registerRequest = payload => ({
  type: 'REGISTER_REQUEST',
  payload,
});

export const saveTrip = payload => ({
  type: 'SAVE_TRIP',
  payload,
});

export const getHistory = payload => ({
  type: 'GET_HISTORY',
  payload,
});

export const getFavorites = payload => ({
  type: 'GET_FAVORITE',
  payload,
});

/* THUNK */

export const registerUser = (payload, redirecUrl) => {
  return dispatch => {
    axios
      .post(`${URL_API}registeruser`, payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => {
        window.location.href = redirecUrl;
      })
      .catch(err => {
        return new Error(err);
      });
  };
};

export const loginRequest = payload => {
  return dispatch => {
    axios
      //hacer cambio a post para poner en produccion
      //.post(`${URL_API}loginuser`, payload)
      .get(`${URL_API}loginuser/${payload.email}`)
      .then(({ data }) => dispatch(setLogin(data.body)))
      .catch(err => {
        return new Error(err);
      });
  };
};

export const saveTripRequest = payload => {
  return dispatch => {
    axios
      .post(`${URL_API}savetrip`, payload)
      .then(({ data }) => dispatch(saveTrip(data.body)))
      .catch(err => {
        return new Error(err);
      });
  };
};

export const historyRequest = payload => {
  return dispatch => {
    axios
      .get(`${URL_API}userTravels/${payload}`)
      .then(({ data }) => dispatch(getHistory(data.body.travels)))
      .catch(err => {
        return new Error(err);
      });
  };
};

export const favoriteRequest = payload => {
  return dispatch => {
    axios
      .get(`${URL_API}userTravels/${payload}`)
      .then(({ data }) => dispatch(getFavorites(data.body.travels)))
      .catch(err => {
        return new Error(err);
      });
  };
};
