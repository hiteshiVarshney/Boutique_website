import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { Product } from './models/Product.js';
import { Category } from './models/Category.js';
import { GalleryImage } from './models/GalleryImage.js';
import { Testimonial } from './models/Testimonial.js';

import {
  products,
  categories,
  galleryImages,
  testimonials,
} from '../src/data/boutique.js';

dotenv.config();

async function seed() {
  await connectDB();

  console.log('Clearing existing data...');
  await Promise.all([
    Product.deleteMany({}),
    Category.deleteMany({}),
    GalleryImage.deleteMany({}),
    Testimonial.deleteMany({}),
  ]);

  console.log('Inserting products...');
  await Product.insertMany(products);

  console.log('Inserting categories...');
  await Category.insertMany(categories);

  console.log('Inserting gallery images...');
  await GalleryImage.insertMany(galleryImages);

  console.log('Inserting testimonials...');
  await Testimonial.insertMany(testimonials);

  console.log('Seed complete!');
  console.log(`  Products:     ${products.length}`);
  console.log(`  Categories:   ${categories.length}`);
  console.log(`  Gallery:      ${galleryImages.length}`);
  console.log(`  Testimonials: ${testimonials.length}`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
