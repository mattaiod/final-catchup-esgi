import { FastifyMongoNestedObject, FastifyMongoObject, FastifyMongodbOptions } from "@fastify/mongodb";
import { FastifyInstance, FastifyRequest } from "fastify";
import { AuthRouter } from "./api/auth";
import { ProductRouter } from "./api/product";
import { StockRouter } from "./api/stock";
import { UserRouter } from "./api/user";


declare module 'fastify' {
  interface FastifyInstance {
    mongo: FastifyMongoObject & FastifyMongoNestedObject;
  }
}

export default async function router(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  fastify.register(AuthRouter)
  fastify.register(ProductRouter)
  fastify.register(StockRouter)
  fastify.register(UserRouter)
}

//   fastify.post('/books', async (request, reply) => {
//     const result = await fastify
//         .mongo.db.collection('books')
//         .insertOne(request.body)

//     reply.send({
//         message: 'book added',
//         id: result.insertId
//     })
// })

// fastify.get('/books', async (request, reply) => {
//   const books = await fastify
//       .mongo.db.collection('books')
//       .find().toArray()

//   reply.send(books)
// })

// fastify.put('/books/:bookId', async (request, reply) => {
//   const { bookId } = request.params;
//   const ObjectId = fastify.mongo.ObjectId
//   const result = await fastify
//       .mongo.db.collection('books')
//       .replaceOne(
//           { _id: new ObjectId(bookId) },
//           request.body
//       )

//   reply.send({
//       message: 'book updated',
//       id: result.insertId
//   })
// })

// fastify.delete('/books/:bookId', async (request, reply) => {
//   const { bookId } = request.params;
//   const ObjectId = fastify.mongo.ObjectId
//   await fastify
//       .mongo.db.collection('books')
//       .deleteOne({ _id: new ObjectId(bookId) })

//   reply.statusCode = 204
//   reply.send(null)
// })




