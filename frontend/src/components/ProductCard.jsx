import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent Link navigation
    addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      size: product.category === 'Fashion' ? ((product.name.toLowerCase().includes('shoe') || product.name.toLowerCase().includes('sneaker') || product.name.toLowerCase().includes('trainer')) ? '8' : 'M') : undefined
    }, 1, true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault(); // Prevent Link navigation
    addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      size: product.category === 'Fashion' ? ((product.name.toLowerCase().includes('shoe') || product.name.toLowerCase().includes('sneaker') || product.name.toLowerCase().includes('trainer')) ? '8' : 'M') : undefined
    }, 1, true);
    navigate('/cart');
  };
  return (
    <div style={{ border: 'none', borderRadius: '8px', padding: '1rem', background: '#fff', textAlign: 'left', transition: 'box-shadow 0.2s', ':hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.1)' } }}>
      <Link to={`/product/${product._id}`} style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'contain' }} />
      </Link>
      <div>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: '#333' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', margin: '0' }}>{product.name}</h3>
        </Link>
        <p style={{ color: '#878787', fontSize: '0.8rem', margin: '0.3rem 0 0.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {product.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#212121' }}>₹ {product.price}</span>
          {product.discount > 0 && (
            <>
              <span style={{ fontSize: '0.9rem', color: '#878787', textDecoration: 'line-through' }}>₹{product.originalPrice}</span>
              <span style={{ fontSize: '0.8rem', color: '#388e3c', fontWeight: 'bold' }}>( {product.discount}% off )</span>
            </>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <button 
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            style={{ flex: 1, padding: '0.5rem', background: '#6b7280', border: 'none', borderRadius: '4px', color: 'white', cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
          >
            Add to Cart
          </button>
          <button 
            onClick={handleBuyNow}
            disabled={product.countInStock === 0}
            style={{ flex: 1, padding: '0.5rem', background: '#facc15', border: 'none', borderRadius: '4px', color: 'black', cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed', fontWeight: 'bold' }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
