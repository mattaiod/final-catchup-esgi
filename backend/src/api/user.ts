import { FastifyInstance } from "fastify";
import { User } from '../schemas/user';
import { verifyRole } from "./auth";
import { ObjectId } from "mongodb";

export type UserReply = {
  _id: ObjectId;
  email: string;
  role: string;
}
export const UserRouter = async (fastify: FastifyInstance) => {

  fastify.get("/api/users", async (request, reply) => {
    try {
      const users = await User.find({});
      const usersToSend: UserReply[] = users.map((user) => {
        return {
          _id: user._id,
          email: user.email,
          role: user.role
        }
      })
      reply.code(200).send(usersToSend);
    } catch (e) {
      reply.code(500).send(e);
    }
  });
  fastify.put<{Params: {id: string}}>("/api/change-role-to-admin/:id", { preHandler: verifyRole("admin") }, async (request, reply) => {
    try {
      const userId = request.params.id;
      if (userId === undefined) {
        reply.code(400).send({ error: "User ID is required" });
      }
      const user = await User.findByIdAndUpdate(userId, { role: "admin" });
      if (user === null) {
        reply.code(404).send({ error: "User not found" });
      } else {
        const userToSend: UserReply = {
          _id: user._id,
          email: user.email,
          role: user.role
        }
        reply.code(200).send(userToSend);
      }
    } catch (e) {
      reply.code(500).send(e);
    }
  }
);

fastify.put<{Params: {id: string}}>("api/change-role-to-user/:id", { preHandler: verifyRole("admin") }, async (request, reply) => {
  try {
    const userId = request.params.id;
    if (userId === undefined) {
      reply.code(400).send({ error: "User ID is required" });
    }
    const user = await User.findByIdAndUpdate(userId, { role: "user" });
    if (user === null) {
      reply.code(404).send({ error: "User not found" });
    } else {
      const userToSend: UserReply = {
        _id: user._id,
        email: user.email,
        role: user.role
      }
      reply.code(200).send(userToSend);
    }
  } catch (e) {
    reply.code(500).send(e);
  }
});

fastify.put<{Params: {id: string}}>('/api/user/:id', async (request, reply) => {
  try {
    const userId = request.params.id;
    if (userId === undefined) {
      reply.code(400).send({ error: "User ID is required" });
    }
    const user = await User.findById(userId)
    if (user === null) {
      reply.code(404).send({ error: "User not found" });
    } else {
      const userToSend: UserReply = {
        _id: user._id,
        email: user.email,
        role: user.role
      }
      reply.code(200).send(userToSend);
    }
  } catch (e) {
    reply.code(500).send(e);
  }
})
}


