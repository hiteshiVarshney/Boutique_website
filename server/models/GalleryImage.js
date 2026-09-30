import { Schema, model } from 'mongoose';

const galleryImageSchema = new Schema(
  {
    src: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const GalleryImage = model('GalleryImage', galleryImageSchema);
