const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_LOGIN':
			return {
				...state,
				user: action.payload,
			};
		case 'SET_LOGOUT':
			return {
				...state,
				user: {},
			};
		case 'SET_USER':
			return {
				...state,
				profile: action.payload,
			};
		case 'SET_LOCATION':
			return {
				...state,
				locationNow: action.payload,
			};
		case 'SET_NOTIFICATION':
			return {
				...state,
				notificationstate: action.payload,
			};
		case 'GET_HISTORY':
			return {
				...state,
				historytrips: action.payload,
			};
		case 'GET_FAVORITE':
			return {
				...state,
				favorites: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
