import { FastifyInstance } from "fastify";
import { Stock } from "../schemas/stock";
import { ExtractInterface } from "../utils/type";

export type StockReply = ExtractInterface<typeof Stock>
export type StockPayload = ExtractInterface<typeof Stock>

export const StockRouter = async (fastify: FastifyInstance) => {
  fastify.get("/api/stocks", async (request, reply) => {
    try {
      const stock = await Stock.find({});
      reply.code(200).send(stock);
    } catch (e) {
      reply.code
      (500
      ).
      send(e);
    }
  }
  );

 fastify.post('/api/stock', async (request, reply) => {
    try {
      const stock = request.body;
      const newStock = await Stock.create(stock);
      reply.code(201).send(newStock);
    } catch (e) {
      reply.code(500).send
      (e);
    }
  })

  fastify.get<{ Params: { id: string } }>('/api/stock/:id', async (request, reply) => {
    try {
      const stockId = request.params.id;
      const stock = await Stock.findById(stockId);
      reply.code(200).send(stock);
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  fastify.put<{ Params: { id: string }, Body: typeof Stock }>('/api/stock/:id', async (request, reply) => {
    try {
      const stockId = request.params.id;
      const updates = request.body;
      await Stock.findByIdAndUpdate(stockId, request.body);
      const stockToUpdate = await Stock.findById(stockId);
      reply.code(200).send({ data: stockToUpdate });
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  fastify.delete<{ Params: { id: string } }>('/api/stock/:id', async (request, reply) => {
    try {
      const stockId = request.params.id;
      await Stock.findByIdAndDelete(stockId);
      reply.code(200).send({ message: 'Stock deleted' });
    } catch (e) {
      reply.code(500).send(e);
    }
  }
  ); 
}