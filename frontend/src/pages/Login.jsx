import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { search } = useLocation();
  
  const redirect = new URLSearchParams(search).get('redirect') ? `/${new URLSearchParams(search).get('redirect')}` : '/';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mt-8 flex justify-center animate-fade-in">
      <div className="card glass" style={{ width: '100%', maxWidth: '450px', padding: '3rem 2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          Welcome <span className="text-gradient">Back</span>
        </h1>
        
        {error && <div className="badge badge-danger mb-4 text-center w-full" style={{ padding: '1rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}>{error}</div>}
        
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group mb-6">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-full mb-4">
            Sign In
          </button>
        </form>
        
        <p className="text-center text-muted">
          New customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect.replace('/', '')}` : '/register'} className="text-primary hover:text-white transition">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
