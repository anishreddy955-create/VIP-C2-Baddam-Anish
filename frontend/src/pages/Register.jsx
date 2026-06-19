import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [locationStr, setLocationStr] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const { register, user } = useContext(AuthContext);
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
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register(firstName, lastName, locationStr, email, password);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mt-8 flex justify-center animate-fade-in">
      <div className="card glass" style={{ width: '100%', maxWidth: '500px', padding: '3rem 2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
          Create an <span className="text-primary">Account</span>
        </h1>
        
        {error && <div className="badge badge-danger mb-4 text-center w-full" style={{ padding: '1rem', fontSize: '1rem', borderRadius: 'var(--radius-md)' }}>{error}</div>}
        
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Current Location</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="City, Country"
              value={locationStr}
              onChange={(e) => setLocationStr(e.target.value)}
            />
          </div>

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
          
          <div className="form-group">
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

          <div className="form-group mb-6">
            <label className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-full mb-4">
            Register
          </button>
        </form>
        
        <p className="text-center text-muted">
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect.replace('/', '')}` : '/login'} className="text-primary hover:text-white transition">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
