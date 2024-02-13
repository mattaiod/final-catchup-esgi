import { combineReducers } from 'redux';

import userReducer from './userReducer';
import AuthReducer from './authReducer';

const allReducers = combineReducers({
  user: userReducer,
  auth: AuthReducer,
});
export type RootState = ReturnType<typeof allReducers>;

export default allReducers;
