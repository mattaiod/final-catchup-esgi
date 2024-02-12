import { FastifyInstance, FastifyRequest } from "fastify";

export default async function router(fastify: FastifyInstance) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });
}


