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

  server.listen({ port: FASTIFY_PORT, host: "0.0.0.0"}, (error, address) => {
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
