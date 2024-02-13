import InstanceAxios from '@/axios';
import { throwErr } from '../utils/error';
import { StockPayload, StockReply } from '../../../backend/src/api/stock';

export const getStocks = async (): Promise<StockReply[]> => {
  return InstanceAxios.get('/api/stock')
    .then((response: StockReply[]) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};

export const createStock = async (stock: StockPayload): Promise<StockReply> => {
  return InstanceAxios.post('/api/stock', stock)
    .then((response: StockReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};

export const getStock = async (id: string): Promise<StockReply> => {
  return InstanceAxios.get(`/api/stock/${id}`)
    .then((response: StockReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};

export const updateStock = async (id: string, stock: StockPayload): Promise<StockReply> => {
  return InstanceAxios.put(`/api/stock/${id}`, stock)
    .then((response: StockReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};

export const deleteStock = async (id: string): Promise<{ message: string }> => {
  return InstanceAxios.delete(`/api/stock/${id}`)
    .then((response: { message: string }) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};
