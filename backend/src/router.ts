import { FastifyMongoNestedObject, FastifyMongoObject, FastifyMongodbOptions } from "@fastify/mongodb";
import { FastifyInstance, FastifyRequest } from "fastify";
import { NoteRouter } from "./api/note";
import { AuthRouter } from "./api/auth";


declare module 'fastify' {
  interface FastifyInstance {
    mongo: FastifyMongoObject & FastifyMongoNestedObject;
  }
}

export default async function router(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });
}


