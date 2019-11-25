const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_LOGIN':
			return {
				...state,
				user: action.payload,
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
