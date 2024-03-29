import { ObjectId } from 'mongodb';
import mongoose, { Document, Model, Schema } from 'mongoose';

type ExtractDoc<T> = T extends Model<infer U> ? U : never;
type ExtractI<T> = Pick<T, Exclude<keyof T, keyof Document>>;
export type ExtractInterface<T> = ExtractI<ExtractDoc<T>> & { _id: ObjectId };
export type ExtractInterfaceWithoutId<T> = Omit<ExtractInterface<T>, '_id'>;

export type PartialWithoutId<T> = Partial<Omit<T, '_id'>>;