import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categoriesList = ['mobiles', 'Electronics', 'Sports-Equipment', 'Fashion', 'Groceries'];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      {/* Left Sidebar Mock (visual only for now to match screenshot) */}
      <div style={{ width: '200px', flexShrink: 0 }}>
        <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '1rem' }}>Filters</h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ color: '#a0aec0', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Sort By</h4>
          <div style={{ fontSize: '0.8rem', color: '#718096', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <label><input type="radio" name="sort" defaultChecked /> Popularity</label>
            <label><input type="radio" name="sort" /> Price (low to high)</label>
            <label><input type="radio" name="sort" /> Price (high to low)</label>
            <label><input type="radio" name="sort" /> Discount</label>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ color: '#a0aec0', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Categories</h4>
          <div style={{ fontSize: '0.8rem', color: '#718096', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {categoriesList.map(cat => (
              <label key={cat}>
                <input 
                  type="checkbox" 
                  checked={selectedCategories.length === 0 || selectedCategories.includes(cat)} 
                  onChange={() => handleCategoryChange(cat)}
                /> 
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ color: '#a0aec0', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Gender</h4>
          <div style={{ fontSize: '0.8rem', color: '#718096', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <label><input type="checkbox" /> Men</label>
            <label><input type="checkbox" /> Women</label>
            <label><input type="checkbox" /> Unisex</label>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#333' }}>All Products</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {(selectedCategories.length > 0 ? products.filter(p => selectedCategories.includes(p.category)) : products).map(product => (
            <div key={product._id} className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: '#fff', borderRadius: '4px', padding: '1rem', marginBottom: '1rem', height: '150px' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <h3 style={{ fontSize: '0.9rem', color: '#333', marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</h3>
              <p style={{ fontSize: '0.75rem', color: '#718096', marginBottom: '0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {product.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>₹ {product.price}</span>
                {product.discount > 0 && (
                  <span style={{ fontSize: '0.7rem', color: '#10b981' }}>( {product.discount}% off )</span>
                )}
              </div>
              <Link to={`/admin/products/update/${product._id}`} style={{ marginTop: 'auto' }}>
                <button className="admin-btn-outline" style={{ width: '100%' }}>Update</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
