import axios from 'axios';

const URL_API = 'http://10.10.50.13:3000/';

export const setLogin = (payload) => ({
  type: 'SET_LOGIN',
  payload,
});

export const registerRequest = (payload) => ({
  type: 'REGISTER_REQUEST',
  payload,
});

export const saveTrip = (payload) => ({
  type: 'SAVE_TRIP',
  payload,
});

export const getHistory = (payload) => ({
  type: 'GET_HISTORY',
  payload,
});

/* THUNK */

export const registerUser = (payload, redirecUrl) => {
  return (dispatch) => {
    axios
      .post(`${URL_API}registeruser`, payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => {
        window.location.href = redirecUrl;
      })
      .catch((err) => {
        return new Error(err);
      });
  };
};

export const loginRequest = (payload) => {
  return (dispatch) => {
    axios
      .post(`${URL_API}loginuser`, payload)
      .then(({ data }) => dispatch(setLogin(data.body)))
      .catch((err) => {
        return new Error(err);
      });
  };
};

export const saveTripRequest = (payload) => {
  return (dispatch) => {
    axios
      .post(`${URL_API}savetrip`, payload)
      .then(({ data }) => dispatch(saveTrip(data.body)))
      .catch((err) => {
        return new Error(err);
      });
  };
};

export const historyRequest = (payload) => {
  return (dispatch) => {
    axios
      .get(`${URL_API}userTravels/${payload}`)
      .then(({ data }) => dispatch(getHistory(data.body.travels)))
      .catch((err) => {
        return new Error(err);
      });
  };
};
