import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        if (data.category === 'Fashion') {
          const isShoe = data.name.toLowerCase().includes('shoe') || data.name.toLowerCase().includes('sneaker') || data.name.toLowerCase().includes('trainer');
          setSize(isShoe ? '8' : 'M');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      size: product.category === 'Fashion' ? size : undefined
    }, qty);
  };

  const handleBuyNow = () => {
    addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      size: product.category === 'Fashion' ? size : undefined
    }, qty);
    navigate('/cart');
  };

  if (loading) return <div className="container" style={{ padding: '2rem 0' }}>Loading...</div>;
  if (error) return <div className="container" style={{ padding: '2rem 0', color: 'red' }}>{error}</div>;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ marginBottom: '1rem' }}>Go Back</button>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #eee' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', objectFit: 'contain' }} />
        </div>
        
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h2>
          <div style={{ padding: '1rem 0', borderBottom: '1px solid #eee' }}>
            <span style={{ background: '#f3f4f6', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.9rem' }}>
              ★ {product.rating} from {product.numReviews} reviews
            </span>
          </div>
          <h3 style={{ fontSize: '1.8rem', color: '#6366f1', margin: '1rem 0' }}>₹{product.price}</h3>
          <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '1.5rem' }}>{product.description}</p>
          
          <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #ddd' }}>
              <span>Status:</span>
              <span style={{ fontWeight: 'bold', color: product.countInStock > 0 ? 'green' : 'red' }}>
                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
              </span>
            </div>
            
            {product.category === 'Fashion' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <span>Size:</span>
                <select 
                  value={size} 
                  onChange={(e) => setSize(e.target.value)}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '80px' }}
                >
                  {(product.name.toLowerCase().includes('shoe') || product.name.toLowerCase().includes('sneaker') || product.name.toLowerCase().includes('trainer'))
                    ? ['6', '7', '8', '9', '10'].map(s => <option key={s} value={s}>{s}</option>)
                    : ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => <option key={s} value={s}>{s}</option>)
                  }
                </select>
              </div>
            )}
 
            {product.countInStock > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <span>Qty:</span>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                style={{ flex: 1, padding: '1rem', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '4px', cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
                disabled={product.countInStock === 0}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button 
                style={{ flex: 1, padding: '1rem', backgroundColor: '#facc15', color: 'black', border: 'none', borderRadius: '4px', cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
                disabled={product.countInStock === 0}
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
