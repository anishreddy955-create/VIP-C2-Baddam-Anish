import { importData } from './seeder.js';
import connectDB from './config/db.js';
import mongoose from 'mongoose';

const run = async () => {
  await connectDB();
  await importData();
  mongoose.connection.close();
  console.log("Done");
};
run();
