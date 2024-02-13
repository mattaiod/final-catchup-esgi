import InstanceAxios from '@/axios';
import { throwErr } from '../utils/error';
import { ProductPayload, ProductReply } from '../../../backend/src/api/product';

export const getProducts = async (): Promise<ProductReply[]> => {
  const val = await InstanceAxios.get('/api/products')
    .then((response: ProductReply[]) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
  return val.data;
};

export const createProduct = async (product: ProductPayload): Promise<ProductReply> => {
  const val = await InstanceAxios.post('/api/products', product)
    .then((response: ProductReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
  return val.data;
};

export const getProduct = async (id: string): Promise<ProductReply> => {
  const val = await InstanceAxios.get(`/api/products/${id}`)
    .then((response: ProductReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
  return val.data;
};

export const updateProduct = async (id: string, product: Partial<ProductPayload>): Promise<ProductReply> => {
  const val = await InstanceAxios.put(`/api/products/${id}`, product)
    .then((response: ProductReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
  return val.data;
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const val = await InstanceAxios.delete(`/api/products/${id}`)
    .then((response: { message: string }) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
  return val.data;
};
