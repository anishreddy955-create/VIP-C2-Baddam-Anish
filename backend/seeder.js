import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const users = [
  {
    firstName: 'Style',
    lastName: 'Admin',
    location: 'Mumbai, India',
    email: 'admin@example.com',
    password: 'admin',
    isAdmin: true,
  },
  {
    firstName: 'John',
    lastName: 'Doe',
    location: 'Delhi, India',
    email: 'john@example.com',
    password: 'password',
  },
];

export const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const hashedUsers = users.map(user => ({
      ...user,
      password: bcrypt.hashSync(user.password, 10)
    }));

    const createdUsers = await User.insertMany(hashedUsers);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = [];

    const categoryData = {
      'mobiles': {
        items: [
          { name: "Apple iPhone 15 Pro", brand: "Apple", price: 95000 },
          { name: "Samsung Galaxy S24 Ultra", brand: "Samsung", price: 98000 },
          { name: "OnePlus 12", brand: "OnePlus", price: 65000 },
          { name: "Google Pixel 8 Pro", brand: "Google", price: 75000 },
          { name: "Vivo X100 Pro", brand: "Vivo", price: 80000 },
          { name: "Oppo Reno 11 Pro", brand: "Oppo", price: 38000 },
          { name: "Motorola Edge 50 Ultra", brand: "Motorola", price: 55000 },
          { name: "iQOO 12 Pro", brand: "iQOO", price: 60000 },
          { name: "Realme GT 5 Pro", brand: "Realme", price: 42000 },
          { name: "Xiaomi 14", brand: "Xiaomi", price: 70000 }
        ]
      },
      'Electronics': {
        items: [
          { name: "Apple MacBook Pro 14 M3", brand: "Apple", price: 99900 },
          { name: "Sony 55-inch 4K Ultra HD TV", brand: "Sony", price: 75000 },
          { name: "Samsung Front Load Washing Machine 9kg", brand: "Samsung", price: 48000 },
          { name: "LG Double Door Smart Refrigerator", brand: "LG", price: 62000 },
          { name: "Dyson V12 Detect Slim Vacuum", brand: "Dyson", price: 45000 },
          { name: "Bose Smart Soundbar 900", brand: "Bose", price: 80000 },
          { name: "Canon EOS R10 Mirrorless Camera", brand: "Canon", price: 72000 },
          { name: "Dell XPS 13 Laptop", brand: "Dell", price: 90000 },
          { name: "HP Spectre x360", brand: "HP", price: 95000 },
          { name: "iPad Pro 11-inch", brand: "Apple", price: 85000 }
        ]
      },
      'Sports-Equipment': {
        items: [
          { name: "Kookaburra Kahuna Cricket Bat", brand: "Kookaburra", price: 6800 },
          { name: "Yonex Astrox 99 Badminton Racquet", brand: "Yonex", price: 5900 },
          { name: "Decathlon Triban RC120 Road Bike", brand: "Decathlon", price: 7000 },
          { name: "Spalding TF-1000 Leather Basketball", brand: "Spalding", price: 4500 },
          { name: "Wilson Clash 100 Tennis Racquet", brand: "Wilson", price: 6200 },
          { name: "Nivia Sun-Blazer Football Goal Post Set", brand: "Nivia", price: 3500 },
          { name: "Cosco Professional Table Tennis Table", brand: "Cosco", price: 6000 },
          { name: "Stag Ninja Balsa Table Tennis Bat", brand: "Stag", price: 2500 },
          { name: "SG Savage Edition Wicket Keeping Kit", brand: "SG", price: 4800 },
          { name: "Puma Professional Golf Kit Bag", brand: "Puma", price: 5500 }
        ]
      },
      'Fashion': {
        items: [
          { name: 'Nike Air Max Running Shoes', brand: 'Nike', price: 5800, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
          { name: 'Biba Premium Anarkali Kurta Set', brand: 'Biba', price: 4200, image: 'https://images.unsplash.com/photo-1583391733958-650fac5ef46c?w=500&q=80' },
          { name: 'Ray-Ban Classic Wayfarer Sunglasses', brand: 'Ray-Ban', price: 5200, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80' },
          { name: 'Zara Leather Trench Coat', brand: 'Zara', price: 5900, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80' },
          { name: 'Tommy Hilfiger Slim Fit Blazer', brand: 'Tommy Hilfiger', price: 6000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80' },
          { name: 'Levi\'s 501 Original Fit Jeans', brand: 'Levi\'s', price: 3400, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80' },
          { name: 'Fossil Grant Chronograph Watch', brand: 'Fossil', price: 5500, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80' },
          { name: 'H&M Hooded Parka Jacket', brand: 'H&M', price: 3800, image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&q=80' },
          { name: 'Adidas Ultraboost Sneaker', brand: 'Adidas', price: 5990, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80' },
          { name: 'Allen Solly Linen Shirt', brand: 'Allen Solly', price: 2200, image: 'https://images.unsplash.com/photo-1596755094514-f87e32f08286?w=500&q=80' }
        ]
      },
      'Groceries': {
        items: [
          { name: "India Gate Super Basmati Rice, 5kg", brand: "India Gate", price: 950 },
          { name: "Aashirvaad Shudh Chakki Atta, 5kg", brand: "Aashirvaad", price: 320 },
          { name: "Saffola Gold Blended Cooking Oil, 2L", brand: "Saffola", price: 390 },
          { name: "Amul Premium Butter, 500g", brand: "Amul", price: 275 },
          { name: "Dabur 100% Pure Honey, 500g", brand: "Dabur", price: 380 },
          { name: "Nescafé Gold Premium Instant Coffee, 100g", brand: "Nescafe", price: 650 },
          { name: "Tata Tea Premium, 1kg", brand: "Tata", price: 420 },
          { name: "Happilo Premium California Almonds, 500g", brand: "Happilo", price: 550 },
          { name: "Surf Excel Matic Front Load Detergent, 2kg", brand: "Surf Excel", price: 450 },
          { name: "Maggi 2-Minute Noodles Masala, 12-Pack", brand: "Nestle", price: 180 }
        ]
      }
    };

    const genders = ['Men', 'Women', 'Unisex'];
    const categories = Object.keys(categoryData);

    categories.forEach((cat) => {
      const data = categoryData[cat];
      for (let i = 0; i < 10; i++) {
        const item = data.items[i];
        const originalPrice = item.price;
        // Adjust the price slightly to create a discount
        const discount = Math.floor(Math.random() * 20 + 5); // 5% to 25% discount
        const finalPrice = Math.floor(originalPrice - (originalPrice * discount / 100));

        let imageUrl = item.image || `https://image.pollinations.ai/prompt/${encodeURIComponent(item.name + ' product photography isolated on solid white background')}?width=400&height=400&nologo=true`;
        if (item.name.includes('Tata Salt')) {
          imageUrl = 'https://m.media-amazon.com/images/I/61pD7Xk+l4L._SL1500_.jpg';
        } else if (item.name.includes('Aashirvaad')) {
          imageUrl = 'https://m.media-amazon.com/images/I/81x2p2H+eWL._SL1500_.jpg';
        } else if (item.name.includes('India Gate Basmati')) {
          imageUrl = 'https://m.media-amazon.com/images/I/71h3Kty2AFL._SX679_.jpg';
        } else if (item.name.includes('Surf Excel')) {
          imageUrl = 'https://m.media-amazon.com/images/I/61gR2Gf4X6L._SX679_.jpg';
        }

        sampleProducts.push({
          name: item.name,
          image: imageUrl,
          description: `Premium quality ${item.name} from ${item.brand}. Authentic and durable.`,
          brand: item.brand,
          category: cat,
          originalPrice: originalPrice,
          discount: discount,
          price: finalPrice,
          gender: genders[Math.floor(Math.random() * genders.length)],
          countInStock: Math.floor(Math.random() * 50) + 5,
          rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)), // 3.5 to 5.0
          numReviews: Math.floor(Math.random() * 200) + 10,
          user: adminUser,
        });
      }
    });

    await Product.insertMany(sampleProducts);
    console.log('Product data successfully imported!');
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
  }
};
