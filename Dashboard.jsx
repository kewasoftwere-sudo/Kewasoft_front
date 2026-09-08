import React, { useState } from 'react';

export default function Dashboard({ user, onLogout }) {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Office Chai Samosa', amount: 150, category: 'Food', date: '2026-09-08' },
    { id: 2, title: 'Hosting & Server', amount: 500, category: 'Tech', date: '2026-09-07' }
  ]);
  
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: 'General' });
  const [showSettings, setShowSettings] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const userUniqueLink = `https://kewasoft.onrender.com/user/${user?.uid || 'guest-user'}`;

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) return;

    const expenseItem = {
      id: Date.now(),
      title: newExpense.title,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: new Date().toISOString().split('T')[0]
    };

    setExpenses([expenseItem, ...expenses]);
    setNewExpense({ title: '', amount: '', category: 'General' });
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', background: '#f8f9fa', minHeight: '100vh', padding: '20px' }}>
      
      {/* Top Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Kewasoft Expense Tracker</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setShowSettings(!showSettings)} 
            style={{ padding: '8px 14px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            ⚙️ Settings
          </button>
          <button 
            onClick={onLogout} 
            style={{ padding: '8px 14px', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            🚪 Logout
          </button>
        </div>
      </header>

      {/* Settings Modal / Box */}
      {showSettings && (
        <div style={{ background: '#e9ecef', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
          <h3>Account Settings</h3>
          <p><strong>Logged in as:</strong> {user?.email || 'Guest User'}</p>
          <p><strong>User ID:</strong> {user?.uid || 'N/A'}</p>
          <button onClick={() => setShowSettings(false)} style={{ padding: '5px 10px', cursor: 'pointer' }}>Close Settings</button>
        </div>
      )}

      {/* Unique Tracking Link Box */}
      <div style={{ background: '#e2f0d9', border: '1px solid #c3e6cb', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
        <strong>🔗 Aapka Unique Tracking Link:</strong>
        <input 
          type="text" 
          value={userUniqueLink} 
          readOnly 
          style={{ width: '100%', marginTop: '8px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff' }} 
        />
      </div>

      {/* Main Grid: Add Form & Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Form Section */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3>Add New Expense</h3>
          <form onSubmit={handleAddExpense}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Title</label>
              <input 
                type="text" 
                placeholder="e.g., Lunch, Petrol" 
                value={newExpense.title} 
                onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Amount (₹)</label>
              <input 
                type="number" 
                placeholder="0.00" 
                value={newExpense.amount} 
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Category</label>
              <select 
                value={newExpense.category} 
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                <option value="General">General</option>
                <option value="Food">Food & Drinks</option>
                <option value="Tech">Tech & Hosting</option>
                <option value="Travel">Travel</option>
              </select>
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
              Add Expense
            </button>
          </form>
        </div>

        {/* Expenses List & Stats */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ margin: 0 }}>Expense Records</h3>
            <div>
              <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '15px' }}>Total: ₹{totalExpense}</span>
              <button 
                onClick={handleDownloadPDF} 
                style={{ padding: '6px 12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                📥 Download PDF
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#f1f3f5', borderBottom: '2px solid #dee2e6' }}>
                  <th style={{ padding: '10px' }}>Title</th>
                  <th style={{ padding: '10px' }}>Category</th>
                  <th style={{ padding: '10px' }}>Date</th>
                  <th style={{ padding: '10px' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '10px' }}>{item.title}</td>
                    <td style={{ padding: '10px' }}>{item.category}</td>
                    <td style={{ padding: '10px' }}>{item.date}</td>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#dc3545' }}>₹{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Footer with Privacy Policy Link */}
      <footer style={{ textAlign: 'center', marginTop: '30px', color: '#6c757d', fontSize: '14px' }}>
        <p>© 2026 Kewasoft. All rights reserved. | 
          <span 
            onClick={() => setShowPrivacy(true)} 
            style={{ color: '#007bff', cursor: 'pointer', marginLeft: '5px', textDecoration: 'underline' }}>
            Privacy Policy & Terms
          </span>
        </p>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', width: '500px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h3>Privacy Policy & Terms</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.5', color: '#444' }}>
              At Kewasoft Expense Tracker, we respect your privacy. All your financial records and expense data are securely encrypted and tied exclusively to your unique user ID and link. We do not share your data with third parties. By using this service, you agree to secure your login credentials and tracking links.
            </p>
            <button onClick={() => setShowPrivacy(false)} style={{ marginTop: '15px', padding: '8px 15px', background: '#333', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
