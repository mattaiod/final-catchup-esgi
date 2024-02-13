import fastify from "fastify";
import "dotenv/config";

import pino from "pino";
import router from "./router";

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT) || 3006;

export const logger =
  process.env.NODE_ENV !== "production" ? pino() : pino({ enabled: false });

const main = async () => {
  logger.info("");
  logger.info("🏁 Starting Fastify server...");

  const server = fastify({ bodyLimit: 1_000_000, trustProxy: true });

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
