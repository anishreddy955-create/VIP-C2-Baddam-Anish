import Product from '../models/productModel.js';

// Fetch all products
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};
      
    // Handle category array (e.g. category=mobiles,Electronics)
    let categoryFilter = {};
    if (req.query.category && req.query.category !== 'all') {
      const categories = req.query.category.split(',');
      categoryFilter = { category: { $in: categories } };
    }
      
    // Handle gender array
    let genderFilter = {};
    if (req.query.gender && req.query.gender !== 'all') {
      const genders = req.query.gender.split(',');
      genderFilter = { gender: { $in: genders } };
    }

    const sortOrder = req.query.sortOrder || 'popular';
    let sortObj = {};
    if (sortOrder === 'price-low') sortObj = { price: 1 };
    else if (sortOrder === 'price-high') sortObj = { price: -1 };
    else if (sortOrder === 'discount') sortObj = { discount: -1 };
    else sortObj = { numReviews: -1 };

    const products = await Product.find({ ...keyword, ...categoryFilter, ...genderFilter }).sort(sortObj);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Create a product
export const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name || 'Sample name',
      price: req.body.price || 0,
      user: req.user._id,
      image: req.body.image || '/images/sample.jpg',
      brand: req.body.brand || 'Sample brand',
      category: req.body.category || 'Sample category',
      gender: req.body.gender || 'Unisex',
      countInStock: req.body.countInStock || 0,
      numReviews: 0,
      description: req.body.description || 'Sample description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update a product
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, brand, category, gender, countInStock } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      if(gender) product.gender = gender;
      product.countInStock = countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
