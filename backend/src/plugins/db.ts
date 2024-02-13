import mongoose from 'mongoose';
import fastifyPlugin from 'fastify-plugin';
import { fromEnv } from '../utils/system';
import { FastifyInstance } from 'fastify';
import fastifyMongodb from '@fastify/mongodb';

export const dbConnector = async  (fastify: FastifyInstance, options: any, next: any) => {
  fastify.register(fastifyMongodb, {
    url: 'mongodb://localhost:27017/test'
  });
}

