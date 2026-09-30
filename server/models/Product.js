import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true, trim: true },
    tag: { type: String, trim: true, enum: ['New', 'Bestseller', ''], default: '' },
  },
  { timestamps: true }
);

export const Product = model('Product', productSchema);
