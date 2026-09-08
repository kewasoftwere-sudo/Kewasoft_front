import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);

  const ADMIN_SECRET = 'kewasoftadmin2026';

  const [users, setUsers] = useState([
    { id: 'usr_001', email: 'rahul@gmail.com', trackingLink: 'https://kewasoft.onrender.com/user/usr_001', totalExpenses: 4500 },
    { id: 'usr_002', email: 'amit@gmail.com', trackingLink: 'https://kewasoft.onrender.com/user/usr_002', totalExpenses: 1200 },
    { id: 'usr_003', email: 'priya@gmail.com', trackingLink: 'https://kewasoft.onrender.com/user/usr_003', totalExpenses: 3400 }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_SECRET) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', background: '#f4f6f9', minHeight: '100vh', padding: '20px' }}>
      
      {!isAuthenticated ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '350px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '10px', color: '#333' }}>🔒 Kewasoft Admin</h2>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>Please enter admin password to continue</p>
            
            <form onSubmit={handleLogin}>
              <input 
                type="password" 
                placeholder="Enter Admin Password" 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '12px', boxSizing: 'border-box' }}
              />
              {error && <p style={{ color: '#dc3545', fontSize: '12px', marginBottom: '10px' }}>❌ Galat password! Dubara try karein.</p>}
              <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Login to Admin Panel
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
            <h2 style={{ margin: 0, color: '#333' }}>🛠️ Kewasoft Admin Portal</h2>
            <button 
              onClick={() => setIsAuthenticated(false)} 
              style={{ padding: '8px 14px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              🔒 Lock Admin
            </button>
          </header>

          <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3>Registered Users & Tracking Links</h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>Yahan se aap sabhi users ke unique links aur unke records par nazar rakh sakte hain.</p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f1f3f5', borderBottom: '2px solid #dee2e6' }}>
                    <th style={{ padding: '12px' }}>User ID</th>
                    <th style={{ padding: '12px' }}>Email</th>
                    <th style={{ padding: '12px' }}>Unique Tracking Link</th>
                    <th style={{ padding: '12px' }}>Total Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{u.id}</td>
                      <td style={{ padding: '12px' }}>{u.email}</td>
                      <td style={{ padding: '12px' }}>
                        <input 
                          type="text" 
                          value={u.trackingLink} 
                          readOnly 
                          style={{ width: '100%', padding: '6px', fontSize: '12px', background: '#f8f9fa', border: '1px solid #ccc', borderRadius: '4px' }}
                        />
                      </td>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#28a745' }}>₹{u.totalExpenses}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

ReactDOM.createRoot(document.getElementById('admin-root')).render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
);
