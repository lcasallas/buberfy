import axios from 'axios';

const URL_API = process.env.DB_API;

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

export const saveTravel = payload => ({
	type: 'SAVE_TRAVEL',
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

export const setNotificacion = payload => ({
	type: 'SET_NOTIFICATION',
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
	console.log(URL_API);
	return dispatch => {
		axios
			//hacer cambio a post para poner en produccion
			.post(`${URL_API}loginuser`, payload)
			// .get(`${URL_API}loginuser/${payload.email}`)
			.then(({ data }) => {
				const login = data.body.login;

				if (login) {
					dispatch(setLogin(data.body));
				} else {
					dispatch(setNotificacion({ message: data.message, type: 'error' }));
				}
			})
			.catch(err => {
				return new Error(err);
			});
	};
};

export const saveTravelRequest = payload => {
	return dispatch => {
		axios
			.post(`${URL_API}addtravel`, payload)
			.then(({ data }) => {
				if (Object.keys(data.body.travel).length > 0) {
					dispatch(saveTravel(data.body.travel));
					dispatch(setNotificacion({ message: data.message, type: 'success' }));
				} else {
					dispatch(setNotificacion({ message: data.message, type: 'error' }));
				}
			})
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
