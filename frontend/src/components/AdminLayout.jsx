import { useContext, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user || !user.isAdmin) return null;

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="admin-theme">
      <header className="admin-header">
        <Link to="/admin/dashboard" style={{ color: '#14532d', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold' }}>
          OneCart <span style={{ color: '#666', fontWeight: 'normal', fontSize: '1rem' }}>(admin)</span>
        </Link>
        <nav className="admin-nav">
          <Link to="/admin/dashboard" className={isActive('/admin/dashboard')}>Home</Link>
          <Link to="/admin/users" className={isActive('/admin/users')}>Users</Link>
          <Link to="/admin/orders" className={isActive('/admin/orders')}>Orders</Link>
          <Link to="/admin/products" className={isActive('/admin/products')}>Products</Link>
          <Link to="/admin/products/new" className={isActive('/admin/products/new')}>New Product</Link>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.9rem' }}>Logout</button>
        </nav>
      </header>
      <main style={{ padding: '2rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
