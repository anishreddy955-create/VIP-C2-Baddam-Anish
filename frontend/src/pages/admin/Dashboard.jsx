import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });
  const [loading, setLoading] = useState(true);
  const [bannerUrl, setBannerUrl] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          axios.get('/api/auth/users'),
          axios.get('/api/products'),
          axios.get('/api/orders')
        ]);
        setStats({
          users: usersRes.data.length,
          products: productsRes.data.length,
          orders: ordersRes.data.length
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleUpdateBanner = () => {
    alert(`Banner updated to: ${bannerUrl}`);
    setBannerUrl('');
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        
        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 className="admin-card-title">Total users</h3>
          <p className="admin-card-value">{stats.users}</p>
          <Link to="/admin/users" style={{ marginTop: 'auto' }}>
            <button className="admin-btn-outline">View all</button>
          </Link>
        </div>

        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 className="admin-card-title">All Products</h3>
          <p className="admin-card-value">{stats.products}</p>
          <Link to="/admin/products" style={{ marginTop: 'auto' }}>
            <button className="admin-btn-outline">View all</button>
          </Link>
        </div>

        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 className="admin-card-title">All Orders</h3>
          <p className="admin-card-value">{stats.orders}</p>
          <Link to="/admin/orders" style={{ marginTop: 'auto' }}>
            <button className="admin-btn-outline">View all</button>
          </Link>
        </div>

        <div className="admin-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 className="admin-card-title">Add Product</h3>
          <p className="admin-card-value" style={{ fontSize: '1rem', color: '#a0aec0', marginTop: '0.5rem' }}>(new)</p>
          <Link to="/admin/products/new" style={{ marginTop: 'auto' }}>
            <button className="admin-btn-outline">Add now</button>
          </Link>
        </div>

      </div>

      <div className="admin-card" style={{ maxWidth: '400px' }}>
        <h3 className="admin-card-title" style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }}>Update banner</h3>
        <input 
          type="text" 
          className="admin-input" 
          placeholder="Banner url" 
          value={bannerUrl}
          onChange={(e) => setBannerUrl(e.target.value)}
          style={{ marginBottom: '1rem' }}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="admin-btn-outline" onClick={handleUpdateBanner}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
