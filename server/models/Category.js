import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    id: { type: String, required: true, unique: true, trim: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Category = model('Category', categorySchema);
