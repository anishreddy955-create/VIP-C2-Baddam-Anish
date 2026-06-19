import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';
  const categoryParam = searchParams.get('category');

  // Filter States
  const [sortOrder, setSortOrder] = useState('popular');
  const [selectedCategories, setSelectedCategories] = useState(categoryParam ? [categoryParam] : []);
  const [selectedGenders, setSelectedGenders] = useState([]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [categoryParam]);

  const categories = ['mobiles', 'Electronics', 'Sports-Equipment', 'Fashion', 'Groceries'];
  const genders = ['Men', 'Women', 'Unisex'];
  const sortOptions = [
    { value: 'popular', label: 'Popular' },
    { value: 'price-low', label: 'Price (low to high)' },
    { value: 'price-high', label: 'Price (high to low)' },
    { value: 'discount', label: 'Discount' }
  ];

  const handleCategoryChange = (cat) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleGenderChange = (gen) => {
    setSelectedGenders(prev => 
      prev.includes(gen) ? prev.filter(g => g !== gen) : [...prev, gen]
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `/api/products?keyword=${keyword}&sortOrder=${sortOrder}`;
        if (selectedCategories.length > 0) {
          url += `&category=${selectedCategories.join(',')}`;
        }
        if (selectedGenders.length > 0) {
          url += `&gender=${selectedGenders.join(',')}`;
        }
        
        const { data } = await axios.get(url);
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword, sortOrder, selectedCategories, selectedGenders]);

  return (
    <div className="container" style={{ display: 'flex', gap: '2rem', padding: '2rem 0' }}>
      <aside style={{ width: '250px', flexShrink: 0, borderRight: '1px solid #eee', paddingRight: '1rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#333' }}>Filters</h3>
        
        {/* Sort By */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Sort By</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {sortOptions.map((opt) => (
              <li key={opt.value} style={{ marginBottom: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#444' }}>
                  <input 
                    type="radio" 
                    name="sortOrder" 
                    checked={sortOrder === opt.value}
                    onChange={() => setSortOrder(opt.value)}
                    style={{ accentColor: '#6366f1' }}
                  />
                  <span>{opt.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Categories</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {categories.map((c) => (
              <li key={c} style={{ marginBottom: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#444' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedCategories.includes(c)}
                    onChange={() => handleCategoryChange(c)}
                    style={{ accentColor: '#6366f1' }}
                  />
                  <span>{c}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Gender */}
        <div>
          <h4 style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Gender</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {genders.map((g) => (
              <li key={g} style={{ marginBottom: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#444' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedGenders.includes(g)}
                    onChange={() => handleGenderChange(g)}
                    style={{ accentColor: '#6366f1' }}
                  />
                  <span>{g}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div style={{ flexGrow: 1 }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#333' }}>
          {keyword ? `Search Results for "${keyword}"` : 'All Products'}
        </h2>
        
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading products...</div>
        ) : error ? (
          <div style={{ color: 'red', padding: '2rem', textAlign: 'center' }}>{error}</div>
        ) : products.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', background: '#f9fafb', borderRadius: '8px' }}>No products found matching your criteria.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
