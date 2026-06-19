import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, updateCartItemSize } = useContext(CartContext);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div style={{ padding: '2rem', background: '#f9fafb', borderRadius: '8px', textAlign: 'center' }}>
          Your cart is empty. <Link to="/" style={{ color: '#6366f1' }}>Go Back</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          <div>
            {cartItems.map((item) => (
              <div key={item.product + (item.size ? '_' + item.size : '')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#fff', borderBottom: '1px solid #eee', borderRadius: '8px', marginBottom: '1rem' }}>
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flexGrow: 1 }}>
                  <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>
                    {item.name}
                  </Link>
                  {item.size && (
                    <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.85rem', color: '#666' }}>Size:</span>
                      <select 
                        value={item.size}
                        onChange={(e) => updateCartItemSize(item.product, item.size, e.target.value)}
                        style={{ padding: '0.2rem', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.85rem' }}
                      >
                        {(item.name.toLowerCase().includes('shoe') || item.name.toLowerCase().includes('sneaker'))
                          ? ['6', '7', '8', '9', '10'].map(s => <option key={s} value={s}>{s}</option>)
                          : ['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => <option key={s} value={s}>{s}</option>)
                        }
                      </select>
                    </div>
                  )}
                  <div style={{ color: '#6366f1', fontWeight: 'bold', marginTop: '0.5rem' }}>₹{item.price}</div>
                </div>
                <div>
                  <select 
                    value={item.qty} 
                    onChange={(e) => addToCart(item, Number(e.target.value))}
                    style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #ccc' }}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>{x + 1}</option>
                    ))}
                  </select>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product, item.size)}
                  style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2rem', padding: '0.5rem' }}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          
          <div>
            <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
              </h3>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </div>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1rem' }}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
