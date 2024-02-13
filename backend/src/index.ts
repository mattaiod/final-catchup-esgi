import fastify from "fastify";
import "dotenv/config";

import pino from "pino";
import router from "./router";
import fastifyCors from '@fastify/cors';
import mongoose from "mongoose";
import { dbConnector } from "./plugins/db";


const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;

export const logger =
  process.env.NODE_ENV !== "production" ? pino() : pino({ enabled: false });

const main = async () => {
  logger.info("");
  logger.info("🏁 Starting Fastify server...");

  const server = fastify({ bodyLimit: 1_000_000, trustProxy: true });

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
