import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';
import { User } from '../schemas/user';
import { UserReply } from './user';

export type AuthReply = {
  sub: string; // user id
  access_token: string; // JWT
  user: UserReply
}
export type AuthPayload = {
  email: string;
  password: string;
}


export const AuthRouter = async (fastify: FastifyInstance) => {

fastify.post<{ Body: AuthPayload }>('/api/signup', async (request: FastifyRequest<{ Body: AuthPayload }>, reply: FastifyReply) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = new User({ email: request.body.email, password: hashedPassword, role: 'user' });
    await user.save();
    reply.code(201).send(user);
  } catch (e) {
    reply.code(500).send(e);
  }
});

fastify.post<{ Body: AuthPayload }>('/api/signin', async (request: FastifyRequest<{ Body: AuthPayload }>, reply: FastifyReply) => {
  try {
    const user = await User.findOne({ email: request.body.email });
    if (!user) {
      reply.code(400).send({ error: 'Invalid email or password' });
      return;
    }

    const validPassword = await bcrypt.compare(request.body.password, user.password);
    if (!validPassword) {
      reply.code(400).send({ error: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ sub: user.id, role: user.role }, 'your_jwt_secret');
    const response: AuthReply = { sub: user.id, access_token: token, user: user };
    reply.code(200).send(response);
  } catch (e) {
    reply.code(500).send(e);
  }
});

interface Body {
  jwt: string;
}

fastify.post<{ Body: Body }>('/api/decipher-jwt', async (request, reply) => {
  const token = request.body.jwt
  const decoded = decipherJwt(token);
  if (!decoded) {
    reply.code(400).send({ error: 'Invalid token' });
    return;
  }
  reply.code(200).send(decoded);
}
)}

export const decipherJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret') as  { sub: string, role: string };
    return decoded;
  } catch (e) {
    return null;
  }
}


export const verifyRole = (role: string) => async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    reply.code(401).send({ error: 'Invalid authorization header' });
    return;
  }

  const token = authHeader.substring(7);
  const payload = decipherJwt(token);

  if (!payload) {
    reply.code(401).send({ error: 'Invalid token' });
    return;
  }

  if (payload.role !== role) {
    reply.code(403).send({ error: 'Forbidden' });
    return;
  }
};
