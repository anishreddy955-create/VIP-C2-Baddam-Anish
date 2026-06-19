import { useEffect, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';

const PlaceOrder = () => {
  const { cartItems, shippingAddress, paymentMethod, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [success, setSuccess] = useState(false);

  // Calculate prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    }
  }, [shippingAddress, paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      }, { withCredentials: true });

      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#dcfce7', color: '#166534', padding: '1rem 2rem', borderRadius: '8px', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉 Order Placed Successfully!</h2>
          <p style={{ fontSize: '1.2rem' }}>Thank you for your purchase. Your order is being processed.</p>
        </div>
        <div>
          <Link to="/profile" className="btn btn-primary" style={{ padding: '0.8rem 1.5rem', marginRight: '1rem' }}>View My Orders</Link>
          <Link to="/products" className="btn btn-outline" style={{ padding: '0.8rem 1.5rem' }}>Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
        <span style={{ fontWeight: 'bold', color: '#6366f1' }}>1. Shipping</span>
        <span style={{ fontWeight: 'bold', color: '#6366f1' }}>2. Payment</span>
        <span style={{ fontWeight: 'bold', color: '#6366f1' }}>3. Place Order</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Shipping</h2>
            <p>
              <strong>Address: </strong>
              {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode}, {shippingAddress.country}
            </p>
          </div>

          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Payment Method</h2>
            <p><strong>Method: </strong>{paymentMethod}</p>
          </div>

          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Order Items</h2>
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <div>
                {cartItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                    <Link to={`/product/${item.product}`} style={{ flexGrow: 1, textDecoration: 'none', color: '#333' }}>
                      {item.name}
                    </Link>
                    <span>
                      {item.qty} x ₹{item.price} = ₹{(item.qty * item.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>Order Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Items</span>
              <span>₹{itemsPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Shipping</span>
              <span>₹{shippingPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Tax</span>
              <span>₹{taxPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.2rem', borderTop: '1px solid #ddd', paddingTop: '0.5rem' }}>
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            
            {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', background: '#fee2e2', borderRadius: '4px' }}>{error}</div>}

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem' }}
              disabled={cartItems.length === 0 || loading}
              onClick={placeOrderHandler}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
