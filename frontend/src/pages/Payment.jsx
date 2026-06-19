import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Payment = () => {
  const { paymentMethod, savePaymentMethod, shippingAddress } = useContext(CartContext);
  const navigate = useNavigate();

  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'Cash on Delivery');

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(paymentMethodName);
    navigate('/placeorder');
  };

  const methods = ['Cash on Delivery', 'UPI', 'Credit Card', 'Debit Card'];

  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <span style={{ fontWeight: 'bold', color: '#6366f1' }}>1. Shipping</span>
        <span style={{ fontWeight: 'bold', color: '#6366f1' }}>2. Payment</span>
        <span style={{ color: '#ccc' }}>3. Place Order</span>
      </div>

      <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Payment Method</h2>
      <form onSubmit={submitHandler} style={{ background: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #eee' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {methods.map((method) => (
            <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', background: paymentMethodName === method ? '#e0e7ff' : 'transparent' }}>
              <input 
                type="radio" 
                id={method} 
                name="paymentMethod" 
                value={method} 
                checked={paymentMethodName === method} 
                onChange={(e) => setPaymentMethodName(e.target.value)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{method}</span>
            </label>
          ))}
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
          Continue to Place Order
        </button>
      </form>
    </div>
  );
};

export default Payment;
