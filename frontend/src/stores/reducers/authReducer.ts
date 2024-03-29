import {
  getSessionAction,
  GET_SESSION,
  setSessionAction,
  SET_SESSION,
  CLEAR_SESSION,
  clearSessionAction,
} from '../actions';

let defaultState: string = '';
const AuthReducer = (state = defaultState, action: getSessionAction | setSessionAction | clearSessionAction) => {
  switch (action.type) {
    case SET_SESSION:
      localStorage.setItem('session', JSON.stringify(action.payload));
      state = action.payload;

      return state;

    case GET_SESSION:
      state = JSON.parse(localStorage.getItem('session') || '{}');
      return state;

    case CLEAR_SESSION:
      localStorage.removeItem('session');
      state = '';
      return state;

    default:
      return state;
  }
};
export default AuthReducer;
