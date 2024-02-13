import { GET_SESSION, SET_SESSION } from '../types/auth';

export interface getSessionAction {
  type: typeof GET_SESSION;
}

export interface setSessionAction {
  type: typeof SET_SESSION;
  payload: string;
}

export function setToken(token: string): setSessionAction {
  return {
    type: SET_SESSION,
    payload: token,
  };
}

export function getToken(): getSessionAction {
  return {
    type: GET_SESSION,
  };
}
