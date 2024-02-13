import mongoose, { Schema } from 'mongoose';

enum Roles {
  Administrator = 'administrator',
  User = 'user',
}

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['administrator', 'user'], required: true },
});

export const User = mongoose.model('User', UserSchema);