import { CLEAR_SESSION, GET_SESSION, SET_SESSION } from '../types/auth';

export interface getSessionAction {
  type: typeof GET_SESSION;
}

export interface setSessionAction {
  type: typeof SET_SESSION;
  payload: string;
}

export interface clearSessionAction {
  type: typeof CLEAR_SESSION;
}

export function setSession(token: string): setSessionAction {
  return {
    type: SET_SESSION,
    payload: token,
  };
}

export function clearSession(): { type: typeof CLEAR_SESSION } {
  return {
    type: CLEAR_SESSION,
  };
}

export function getSession(): getSessionAction {
  return {
    type: GET_SESSION,
  };
}
