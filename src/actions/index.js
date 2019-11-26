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

export const setLocationNow = payload => ({
	type: 'SET_LOCATION',
	payload,
});

export const registerRequest = payload => ({
	type: 'REGISTER_REQUEST',
	payload,
});

export const getUserProfile = payload => ({
	type: 'SET_USER',
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
	return dispatch => {
		axios
			.post(`${URL_API}loginuser`, payload)
			.then(({ data }) => {
				const login = data.body.login;

				if (login) {
					dispatch(setLogin(data.body));
					dispatch(userRequest(data.body.id_usuario));
				} else {
					dispatch(setNotificacion({ message: data.message, type: 'error' }));
				}
			})
			.catch(err => {
				return new Error(err);
			});
	};
};

export const userRequest = payload => {
	return dispatch => {
		axios
			.get(`${URL_API}users/${payload}`)
			.then(({ data }) => dispatch(getUserProfile(data.body.user)))
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

export const saveFavoriteTravelRequest = payload => {
	return dispatch => {
		axios
			.post(`${URL_API}addFavorite`, payload)
			.then(({ data }) => {
				if (Object.keys(data.body.favorite).length > 0) {
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
			.get(`${URL_API}userFavorites/${payload}`)
			.then(({ data }) => dispatch(getFavorites(data.body.favorites)))
			.catch(err => {
				return new Error(err);
			});
	};
};
