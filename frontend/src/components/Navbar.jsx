import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?keyword=${keyword}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <header style={{ backgroundColor: '#14532d', color: 'white', position: 'sticky', top: 0, zIndex: 50 }}>
      <div className="container flex items-center justify-between" style={{ height: '60px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'white' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px' }}>One<span style={{ color: '#facc15' }}>Cart</span></span>
        </Link>

        <form onSubmit={submitHandler} style={{ position: 'relative', width: '300px' }}>
          <input 
            type="text" 
            placeholder="Search Electronics, Fashion, mobiles, etc.," 
            style={{ width: '100%', padding: '0.4rem 1rem', borderRadius: '4px', border: 'none', color: '#333' }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none' }}>
            <FiSearch style={{ color: '#14532d', fontSize: '1.2rem', cursor: 'pointer' }} />
          </button>
        </form>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Cart is always visible */}
          <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'white', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', transition: 'color 0.2s' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <FiShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: '-8px', 
                  right: '-10px', 
                  background: '#ef4444', 
                  color: '#fff', 
                  minWidth: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem', 
                  fontWeight: 'bold',
                  borderRadius: '50%',
                  padding: '0 4px'
                }}>
                  {cartItems.reduce((a, c) => a + Number(c.qty), 0)}
                </span>
              )}
            </div>
            <span style={{ marginLeft: '4px' }}>Cart</span>
          </Link>

          {!user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.5rem' }}>
              <Link to="/login" className="btn btn-outline" style={{ padding: '0.3rem 1.2rem', borderColor: 'white', color: 'white', borderRadius: '4px' }}>
                Login
              </Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500', transition: 'color 0.2s' }}>
                Register
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginLeft: '0.5rem' }}>
              {user.isAdmin && (
                <Link to="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#eab308', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 'bold' }}>
                  Admin
                </Link>
              )}
              <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'white', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '500' }}>
                <FiUser size={18} /> Profile
              </Link>
              
              <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'white', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: '500' }}>
                <FiLogOut size={18} /> Logout
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
