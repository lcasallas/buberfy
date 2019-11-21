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

// "message": "Usuario creado con exito",
// "body": {
// "user": {
// "id_usuario": 10,
// "password": "123456",
// "nombre": "leonardo",
// "apellido": "casallas",
// "mail": "lcasallas@gmail.com",
// "numero_contacto": null,
// "activo": true
// }
