import fastify from "fastify";
import fastifyMongodb from "@fastify/mongodb";
import fastifyCors from '@fastify/cors';
import "dotenv/config";

import pino from "pino";
import router from "./router";
import { dbConnector } from "./plugins/db";
import mongoose from 'mongoose';
import { fromEnv } from "./utils/system";

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;

export const logger =
  process.env.NODE_ENV !== "production" ? pino() : pino({ enabled: false });

const main = async () => {
  logger.info("");
  logger.info("🏁 Starting Fastify server...");

  const server = await fastify({ bodyLimit: 1_000_000, trustProxy: true });

  try {
    const connectionString = "mongodb://localhost:27017/test"
    logger.info(`Connecting to MongoDB at ${connectionString}`);
    mongoose.connect(connectionString);
    logger.info('Connected to MongoDB');
  } catch (e) {
    console.error(e);
  }

  await server.register(fastifyCors, { origin: '*' })

  await server.register(dbConnector)


  server.register(router);

  // server.setNotFoundHandler((request, reply) => {
  //   server.log.debug(`Route not found: ${request.method}:${request.raw.url}`)

  //   reply.status(404).send({
  //     statusCode: 404,
  //     error: "error",
  //     message: `Route ${request.method}:${request.raw.url} not found`
  //   })
  // })

  // server.setErrorHandler((err, request, reply) => {
  //   server.log.debug(`Request url: ${request.raw.url}`)
  //   server.log.debug(`Payload: ${request.body}`)
  //   server.log.error(`Error occurred: ${err}`)

  //   const code = err.statusCode ?? 500

  //   reply.status(code).send({
  //     statusCode: code,
  //     error: err.name ?? "INTERNAL_SERVER_ERROR",
  //     message: err.message ?? err
  //   })
  // })


  server.listen({ port: FASTIFY_PORT }, (error, address) => {
    if (error) {
      logger.error("LAUNCH BACKEND", error.message);
      throw new Error(error.message);
    }
    logger.info("");
    logger.info(
      `🚀 Fastify server running on http://localhost:${FASTIFY_PORT}`,
    );
  });

  return server;
};

main();
