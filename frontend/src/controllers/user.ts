import InstanceAxios from '@/axios';
import { UserReply } from '../../../backend/src/api/user';
import { throwErr } from '../utils/error';

export const getUsers = async (): Promise<UserReply[]> => {
  return InstanceAxios.get('/api/users')
    .then((response: UserReply[]) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};

export const getUser = async (id: string): Promise<UserReply> => {
  return InstanceAxios.get(`/api/users/${id}`)
    .then((response: UserReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};

export const changeRoleToAdmin = async (id: string): Promise<UserReply> => {
  return InstanceAxios.put(`/api/change-role-to-admin/${id}`)
    .then((response: UserReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};

export const changeRoleToUser = async (id: string): Promise<UserReply> => {
  return InstanceAxios.put(`/api/change-role-to-user/${id}`)
    .then((response: UserReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};
