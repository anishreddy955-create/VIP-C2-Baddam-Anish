import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    let payload = { status };
    
    if (status === 'Cancelled') {
      const reason = window.prompt("Please enter a reason for cancellation:");
      if (reason === null) return; // User cancelled the prompt
      if (reason.trim() === '') {
        alert('Cancellation reason is required.');
        return;
      }
      payload.cancelReason = reason;
    }

    try {
      await axios.put(`/api/orders/${id}/status`, payload);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Failed to update order status');
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#333' }}>Orders</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {orders.map((order) => (
          <div key={order._id} className="admin-card" style={{ display: 'flex', gap: '1.5rem', padding: '1rem' }}>
            <div style={{ width: '120px', flexShrink: 0, background: '#fff', padding: '0.5rem', borderRadius: '8px' }}>
              {order.orderItems[0] && (
                <img src={order.orderItems[0].image} alt={order.orderItems[0].name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              )}
            </div>
            
            <div style={{ flex: 1, fontSize: '0.85rem', color: '#475569', lineHeight: '1.6' }}>
              <div style={{ fontWeight: 'bold', color: '#333', fontSize: '1rem', marginBottom: '0.3rem' }}>
                {order.orderItems.map(item => item.name).join(', ')}
              </div>
              <p style={{ color: '#718096', marginBottom: '0.5rem' }}>{order.orderItems[0]?.description || 'Premium quality product'}</p>
              
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.2rem' }}>
                <span>Size: M</span>
                <span>Quantity: {order.orderItems.reduce((a, c) => a + c.qty, 0)}</span>
                <span>Price: ₹ {order.totalPrice}</span>
                <span>Payment method: {order.paymentMethod}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.2rem' }}>
                <span>UserId: {order.user?._id || order.user}</span>
                <span>Name: {order.shippingAddress?.fullName || 'N/A'}</span>
                <span>Email: {order.user?.email || 'N/A'}</span>
                <span>Mobile: {order.shippingAddress?.mobile || 'N/A'}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
                <span>Ordered on: {new Date(order.createdAt).toISOString().split('T')[0]}</span>
                <span>Address: {order.shippingAddress?.city}</span>
                <span>Pincode: {order.shippingAddress?.postalCode}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span>Order status: <span style={{ color: order.status === 'Delivered' ? '#10b981' : order.status === 'Cancelled' ? '#ef4444' : '#333' }}>{order.status || 'Pending'}</span></span>
                
                {order.status === 'Cancelled' && order.cancelReason && (
                   <span style={{ color: '#ef4444', fontStyle: 'italic', fontSize: '0.8rem', background: '#fee2e2', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                     Reason: {order.cancelReason}
                   </span>
                )}
                
                <select 
                  className="admin-input" 
                  style={{ width: 'auto', padding: '0.3rem 0.5rem', fontSize: '0.85rem' }}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    if(newStatus) handleUpdateStatus(order._id, newStatus);
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>update order status</option>
                  <option value="In-transit">In-transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Pending">Pending</option>
                </select>
                
                <button className="admin-btn-primary" onClick={() => handleUpdateStatus(order._id, 'Updated')}>Update</button>
                <button className="admin-btn-danger" onClick={() => handleUpdateStatus(order._id, 'Cancelled')}>Cancel</button>
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p>No orders found.</p>}
      </div>
    </div>
  );
};

export default AdminOrders;
