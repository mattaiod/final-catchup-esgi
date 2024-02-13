import { FastifyInstance } from "fastify";
import { Product } from "../schemas/product";

export type ProductReply = typeof Product
export type ProductPayload = typeof Product

export const ProductRouter = async (fastify: FastifyInstance) => {
  fastify.get("/api/products", async (request, reply) => {
    try {
      const products = await Product.find({});
      reply.code(200).send(products);
    } catch (e) {
      reply.code(500).send(e);
    }
  }
  );

  fastify.post('/api/products', async (request, reply) => {
    try {
      const product = request.body;
      const newProduct = await Product.create(product);
      reply.code(201).send(newProduct);
    } catch (e) {
      reply.code(500).send(e);
    }
  }
  );

  fastify.get<{ Params: { id: string } }>('/api/products/:id', async (request, reply) => {
    try {
      const productId = request.params.id;
      const product = await Product.findById(productId);
      reply.code(200).send(product);
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  fastify.put<{ Params: { id: string }, Body: typeof Product }>('/api/products/:id', async (request, reply) => {
    try {
      const productId = request.params.id;
      const updates = request.body;
      await Product.findByIdAndUpdate(productId, request.body);
      const productToUpdate = await Product.findById(productId);
      reply.code(200).send({ data: productToUpdate });
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  fastify.delete<{ Params: { id: string } }>('/api/products/:id', async (request, reply) => {
    try {
      const productId = request.params.id;
      await Product.findByIdAndDelete(productId);
      reply.code(200).send({ message: 'Product deleted' });
    } catch (e) {
      reply .code(500).
      send (e);
    }
  }
  );
}