import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Note } from "../schemas/note";

interface Params {
  id: string;
}

interface Body {
  text: string;
}

export const NoteRouter = async (fastify: FastifyInstance) => {

  // get all notes
  fastify.get("/api/notes", async (request, reply) => {
    try {
      const notes = await Note.find({});
      reply.code(200).send(notes);
    } catch (e) {
      reply.code(500).send(e);
    }
  });

  fastify.post<{ Body: Body }>('/api/notes', async (request, reply) => {
    try {
      const note = request.body;
      const newNote = await Note.create(note);
      reply.code(201).send(newNote);
    } catch (e) {
      reply.code(500).send(e);
    }
  }
  );

  
  // get a single note
  fastify.get<{ Params: Params }>('/api/notes/:id', async (request, reply) => {
    try {
      const noteId = request.params.id;
      const note = await Note.findById(noteId);
      reply.code(200).send(note);
    } catch (e) {
      reply.code(500).send(e);
    }
  });
  
  // update a note
  fastify.put<{ Params: Params, Body: Body }>('/api/notes/:id', async (request, reply) => {
    try {
      const noteId = request.params.id;
      const updates = request.body;
      await Note.findByIdAndUpdate(noteId, request.body);
      const noteToUpdate = await Note.findById(noteId);
      reply.code(200).send({ data: noteToUpdate });
    } catch (e) {
      reply.code(500).send(e);
    }
  });
  
  // delete a note
  fastify.delete<{ Params: Params }>('/api/notes/:id', async (request, reply) => {
    try {
      const noteId = request.params.id;
      const noteToDelete = await Note.findById(noteId);
      await Note.findByIdAndDelete(noteId);
      reply.code(200).send({ data: noteToDelete });
    } catch (e) {
      reply.code(500).send(e);
    }
  });

}