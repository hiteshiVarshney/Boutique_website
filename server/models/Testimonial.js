import { Schema, model } from 'mongoose';

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    avatar: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
  },
  { timestamps: true }
);

export const Testimonial = model('Testimonial', testimonialSchema);
