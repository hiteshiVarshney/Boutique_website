import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined in the environment. Copy .env.example to .env and set it.');
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected:', mongoose.connection.host, mongoose.connection.name);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}
