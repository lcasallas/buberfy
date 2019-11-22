const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'SAVE_TRIP':
      return {
        ...state,
        history: state.history.push(action.payload),
      };
    case 'GET_HISTORY':
      return {
        ...state,
        historytrips: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
