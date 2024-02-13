import InstanceAxios from '@/axios';
import { throwErr } from '../utils/error';
import { StockPayload, StockReply } from '../../../backend/src/api/stock';

export const getStocks = async (): Promise<StockReply[]> => {
  const val = await InstanceAxios.get('/api/stocks')
    .then((response: StockReply[]) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
  return val.data;
};

export const createStock = async (stock: StockPayload): Promise<StockReply> => {
  const val = InstanceAxios.post('/api/stocks', stock)
    .then((response: StockReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
  return val.data;
};

export const getStock = async (id: string): Promise<StockReply> => {
  const val = await InstanceAxios.get(`/api/stocks/${id}`)
    .then((response: StockReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
  return val.data;
};

export const updateStock = async (id: string, stock: Partial<StockPayload>): Promise<StockReply> => {
  const val = await InstanceAxios.put(`/api/stocks/${id}`, stock)
    .then((response: StockReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
  return val.data;
};

export const deleteStock = async (id: string): Promise<{ message: string }> => {
  const val = await InstanceAxios.delete(`/api/stocks/${id}`)
    .then((response: { message: string }) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
  return val.data;
};
