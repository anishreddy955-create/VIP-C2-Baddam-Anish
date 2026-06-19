import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminProductNew = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    category: '',
    brand: '',
    countInStock: '',
    gender: 'Unisex'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/products', {
        ...formData,
        price: Number(formData.price),
        countInStock: Number(formData.countInStock)
      });
      alert('Product created successfully');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="admin-card" style={{ width: '100%', maxWidth: '700px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#333', textAlign: 'center' }}>New Product</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product name" 
                className="admin-input" 
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <input 
                type="text" 
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product Description" 
                className="admin-input" 
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <input 
                type="text" 
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Brand" 
                className="admin-input" 
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <input 
                type="text" 
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category" 
                className="admin-input" 
                required
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price" 
                className="admin-input" 
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <input 
                type="number" 
                name="countInStock"
                value={formData.countInStock}
                onChange={handleChange}
                placeholder="Stock count" 
                className="admin-input" 
                required
              />
            </div>
          </div>

          <div>
            <input 
              type="text" 
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Thumbnail img url" 
              className="admin-input" 
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="text" placeholder="Add-on img url (coming soon)" className="admin-input" disabled />
            <input type="text" placeholder="Add-on img url (coming soon)" className="admin-input" disabled />
            <input type="text" placeholder="Add-on img url (coming soon)" className="admin-input" disabled />
          </div>

          <div>
            <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Available Size</h4>
            <div style={{ display: 'flex', gap: '1rem', color: '#475569', fontSize: '0.85rem' }}>
              <label><input type="checkbox" /> S</label>
              <label><input type="checkbox" /> M</label>
              <label><input type="checkbox" /> L</label>
              <label><input type="checkbox" /> XL</label>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Gender</h4>
            <div style={{ display: 'flex', gap: '1rem', color: '#475569', fontSize: '0.85rem' }}>
              <label><input type="radio" name="gender" value="Men" onChange={handleChange} checked={formData.gender === 'Men'} /> Men</label>
              <label><input type="radio" name="gender" value="Women" onChange={handleChange} checked={formData.gender === 'Women'} /> Women</label>
              <label><input type="radio" name="gender" value="Unisex" onChange={handleChange} checked={formData.gender === 'Unisex'} /> Unisex</label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <button type="submit" className="admin-btn-primary" style={{ width: '200px' }}>Add product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductNew;
