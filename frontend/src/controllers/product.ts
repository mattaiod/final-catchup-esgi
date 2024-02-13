import InstanceAxios from '@/axios';
import { throwErr } from '../utils/error';
import { ProductPayload, ProductReply } from '../../../backend/src/api/product';

export const getProducts = async (): Promise<ProductReply[]> => {
  return InstanceAxios.get('/api/products')
    .then((response: ProductReply[]) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};

export const createProduct = async (product: ProductPayload): Promise<ProductReply> => {
  return InstanceAxios.post('/api/products', product)
    .then((response: ProductReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};

export const getProduct = async (id: string): Promise<ProductReply> => {
  return InstanceAxios.get(`/api/products/${id}`)
    .then((response: ProductReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};

export const updateProduct = async (id: string, product: ProductPayload): Promise<ProductReply> => {
  return InstanceAxios.put(`/api/products/${id}`, product)
    .then((response: ProductReply) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  return InstanceAxios.delete(`/api/products/${id}`)
    .then((response: { message: string }) => {
      return response;
    })
    .catch((error: unknown) => {
      throwErr(error);
    });
};
