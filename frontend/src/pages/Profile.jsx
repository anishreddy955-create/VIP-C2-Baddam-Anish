import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      const fetchOrders = async () => {
        try {
          const { data } = await axios.get('/api/orders/myorders', { withCredentials: true });
          setOrders(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user, navigate]);

  const cancelOrderHandler = async (id) => {
    const reason = window.prompt('Please enter a reason for cancellation:');
    if (reason === null) return; // User cancelled prompt
    if (reason.trim() === '') {
      alert('Cancellation reason is required.');
      return;
    }

    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await axios.put(`/api/orders/${id}/cancel`, { cancelReason: reason }, { withCredentials: true });
        // Refresh orders
        const { data } = await axios.get('/api/orders/myorders', { withCredentials: true });
        setOrders(data);
      } catch (err) {
        alert(err.response?.data?.message || err.message);
      }
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>User Profile</h2>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee' }}>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            {user?.isAdmin && (
              <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#e0e7ff', color: '#3730a3', borderRadius: '4px', textAlign: 'center' }}>
                Admin User
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>My Orders</h2>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <div style={{ background: '#f9fafb', padding: '2rem', borderRadius: '8px', border: '1px solid #eee' }}>
              You have no orders yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {orders.map(order => (
                <div key={order._id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #eee' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                    <strong>Order ID: {order._id}</strong>
                    <span style={{ color: '#6366f1', fontWeight: 'bold' }}>₹{order.totalPrice.toFixed(2)}</span>
                  </div>
                  <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: '#555' }}>
                    <strong>Shipping Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    {order.orderItems.map(item => (
                      <div key={item.product} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        <span>{item.name} (x{item.qty}) {item.size && <span style={{fontSize: '0.85rem', color: '#666', marginLeft:'0.5rem'}}>[Size: {item.size}]</span>}</span>
                      </div>
                    ))}
                  </div>
                  {order.status !== 'Cancelled' && (
                    <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '6px', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div>
                        <span style={{ fontSize: '0.9rem', color: '#555' }}><strong>Shipping Status:</strong> <span style={{ color: order.isDelivered ? '#166534' : '#d97706', fontWeight: 'bold' }}>{order.status || 'Pending'}</span></span>
                      </div>
                      {!order.isDelivered && (
                        <div>
                          <span style={{ fontSize: '0.9rem', color: '#555' }}><strong>Estimated Delivery Date:</strong> <span style={{ color: '#333' }}>{new Date(new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span></span>
                        </div>
                      )}
                      {order.isDelivered && (
                        <div>
                          <span style={{ fontSize: '0.9rem', color: '#555' }}><strong>Delivered on:</strong> <span style={{ color: '#166534', fontWeight: 'bold' }}>{new Date(order.deliveredAt).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span></span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{ background: order.isPaid ? '#dcfce7' : '#fee2e2', color: order.isPaid ? '#166534' : '#991b1b', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>
                      {order.isPaid ? `Paid on ${order.paidAt ? order.paidAt.substring(0,10) : 'Date unavailable'}` : 'Not Paid'}
                    </span>

                    {order.status === 'Cancelled' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ background: '#fee2e2', color: '#dc2626', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                          Order Cancelled
                        </span>
                        {order.cancelReason && (
                          <span style={{ fontSize: '0.85rem', color: '#dc2626', fontStyle: 'italic' }}>
                            (Reason: {order.cancelReason})
                          </span>
                        )}
                      </div>
                    )}
                    
                    {order.status !== 'Cancelled' && !order.isDelivered && (
                      <button 
                        onClick={() => cancelOrderHandler(order._id)}
                        style={{ marginLeft: 'auto', padding: '0.4rem 0.8rem', borderRadius: '4px', background: '#fee2e2', color: '#dc2626', border: '1px solid #f87171', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
