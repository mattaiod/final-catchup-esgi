import mongoose, { Schema } from 'mongoose';

const NoteSchema = new Schema({
  text: { type: String, required: true },
});

export const Note = mongoose.model('note', NoteSchema);

