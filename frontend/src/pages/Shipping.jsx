import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Shipping = () => {
  const { shippingAddress, saveShippingAddress } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country });
    navigate('/payment');
  };

  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <span style={{ fontWeight: 'bold', color: '#6366f1' }}>1. Shipping</span>
        <span style={{ color: '#ccc' }}>2. Payment</span>
        <span style={{ color: '#ccc' }}>3. Place Order</span>
      </div>

      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Shipping Address</h2>
      <form onSubmit={submitHandler} style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #eee' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>City</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Postal Code</label>
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Country</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default Shipping;
