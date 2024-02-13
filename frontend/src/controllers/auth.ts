import InstanceAxios from '@/axios';
import { throwErr } from '../utils/error';
import { AuthPayload, AuthReply } from '../../../backend/src/api/auth';
import { UserReply } from '../../../backend/src/api/user';

export const signup = async (user: AuthPayload): Promise<UserReply> => {
  return InstanceAxios.post('/api/signup', user)
    .then((response: AuthReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};

export const signin = async (user: AuthPayload): Promise<AuthReply> => {
  return InstanceAxios.post('/api/signin', user)
    .then((response: AuthReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};
