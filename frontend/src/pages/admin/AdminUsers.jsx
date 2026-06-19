import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AdminUsers = () => {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/auth/users');
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/auth/users/${id}`);
        fetchUsers();
      } catch (error) {
        alert(error.response?.data?.message || 'Error deleting user');
      }
    }
  };

  const toggleAdminStatus = async (user) => {
    if (user._id === currentUser._id) {
      alert('You cannot change your own admin status!');
      return;
    }
    
    try {
      await axios.put(`/api/auth/users/${user._id}`, {
        ...user,
        isAdmin: !user.isAdmin
      });
      fetchUsers();
    } catch (error) {
      alert('Error updating user');
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <div>
      <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#333' }}>Manage Users</h2>
      
      <div className="admin-card" style={{ padding: '0', overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>LOCATION</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td style={{ color: '#718096', fontSize: '0.85rem' }}>{u._id.substring(0, 8)}...</td>
                <td style={{ color: '#333' }}>{u.firstName} {u.lastName}</td>
                <td style={{ color: '#475569' }}>{u.email}</td>
                <td style={{ color: '#475569' }}>{u.location || 'N/A'}</td>
                <td>
                  <button 
                    onClick={() => toggleAdminStatus(u)}
                    style={{ 
                      background: u.isAdmin ? '#10b981' : '#4b5563',
                      color: '#fff', 
                      border: 'none', 
                      padding: '0.2rem 0.8rem', 
                      borderRadius: '12px', 
                      fontSize: '0.75rem',
                      cursor: u._id === currentUser._id ? 'not-allowed' : 'pointer',
                      opacity: u._id === currentUser._id ? 0.6 : 1
                    }}
                    disabled={u._id === currentUser._id}
                  >
                    {u.isAdmin ? 'Admin' : 'Customer'}
                  </button>
                </td>
                <td>
                  <button 
                    className="admin-btn-danger" 
                    onClick={() => deleteHandler(u._id)}
                    disabled={u.isAdmin}
                    style={{ opacity: u.isAdmin ? 0.5 : 1, cursor: u.isAdmin ? 'not-allowed' : 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
