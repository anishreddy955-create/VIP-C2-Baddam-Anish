import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/trendmarket')
  .then(async () => {
    console.log('Connected to DB');
    await Product.updateOne(
      { name: /Tata Salt/i }, 
      { $set: { image: 'https://m.media-amazon.com/images/I/61pD7Xk+l4L._SL1500_.jpg' } }
    );
    await Product.updateOne(
      { name: /Aashirvaad/i }, 
      { $set: { image: 'https://m.media-amazon.com/images/I/81x2p2H+eWL._SL1500_.jpg' } }
    );
    console.log('Product images updated successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
