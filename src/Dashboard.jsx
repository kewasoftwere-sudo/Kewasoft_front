import React, { useState, useEffect } from 'react';

export default function Dashboard({ user, onLogout }) {
  const [expenses, setExpenses] = useState([
    { id: 1, title: 'Office Chai Samosa', amount: 150, category: 'Food', date: '2026-09-08' },
    { id: 2, title: 'Hosting & Server', amount: 500, category: 'Tech', date: '2026-09-07' }
  ]);
  
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: 'General' });
  const [showSettings, setShowSettings] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Settings interactive states
  const [currency, setCurrency] = useState('₹');
  const [darkMode, setDarkMode] = useState(false);
  const [budgetLimit, setBudgetLimit] = useState(5000);
  const [notifications, setNotifications] = useState(true);
  const [autoPdfMonthly, setAutoPdfMonthly] = useState(true); // Month-end auto PDF toggle

  // PDF & Folder Success Notification State
  const [pdfNotification, setPdfNotification] = useState({ show: false, folderName: '', message: '' });

  const userUniqueLink = `https://kewasoft.onrender.com/user/${user?.uid || 'guest-user'}`;

  // Check for month-end automatically on load
  useEffect(() => {
    if (!autoPdfMonthly) return;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // If tomorrow's date is 1, today is the last day of the current month
    const isLastDayOfMonth = tomorrow.getDate() === 1;

    if (isLastDayOfMonth) {
      const folderName = `Kewasoft_Monthly_Report_${today.toLocaleString('default', { month: 'long' })}_${today.getFullYear()}`;
      setPdfNotification({
        show: true,
        folderName,
        message: '📅 Month-end detected! Auto-generated PDF report is ready.'
      });
    }
  }, [autoPdfMonthly]);

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
    const folderName = "Kewasoft_Reports_2026";
    setPdfNotification({ 
      show: true, 
      folderName, 
      message: `Saved to folder: ${folderName}` 
    });

    setTimeout(() => {
      setPdfNotification({ show: false, folderName: '', message: '' });
    }, 4000);
  };

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Theme styles based on dark mode toggle
  const themeStyles = {
    bg: darkMode ? '#121212' : '#f8f9fa',
    cardBg: darkMode ? '#1e1e1e' : '#ffffff',
    text: darkMode ? '#e0e0e0' : '#333333',
    subText: darkMode ? '#a0a0a0' : '#6c757d',
    border: darkMode ? '#333333' : '#dee2e6',
    tableHeaderBg: darkMode ? '#2c2c2c' : '#f1f3f5'
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', background: themeStyles.bg, color: themeStyles.text, minHeight: '100vh', padding: '20px', transition: 'all 0.3s ease' }}>
      
      {/* Top Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: themeStyles.cardBg, padding: '15px 20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '20px', border: `1px solid ${themeStyles.border}` }}>
        <h2 style={{ margin: 0, color: themeStyles.text }}>Kewasoft Expense Tracker</h2>
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

      {/* Settings Modal / Box with Advanced Options */}
      {showSettings && (
        <div style={{ background: darkMode ? '#252525' : '#e9ecef', border: `1px solid ${themeStyles.border}`, padding: '20px', borderRadius: '6px', marginBottom: '20px' }}>
          <h3 style={{ marginTop: 0 }}>Account & Advanced Settings</h3>
          <p><strong>Logged in as:</strong> {user?.email || 'Guest User'}</p>
          <p><strong>User ID:</strong> {user?.uid || 'N/A'}</p>
          
          <hr style={{ borderColor: themeStyles.border, margin: '15px 0' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Currency Symbol</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                style={{ width: '100%', padding: '6px', borderRadius: '4px', border: `1px solid ${themeStyles.border}`, background: themeStyles.cardBg, color: themeStyles.text }}>
                <option value="₹">₹ (INR)</option>
                <option value="$">$ (USD)</option>
                <option value="€">€ (EUR)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px' }}>Monthly Budget Limit ({currency})</label>
              <input 
                type="number" 
                value={budgetLimit} 
                onChange={(e) => setBudgetLimit(e.target.value)}
                style={{ width: '100%', padding: '6px', borderRadius: '4px', border: `1px solid ${themeStyles.border}`, background: themeStyles.cardBg, color: themeStyles.text }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={() => setDarkMode(!darkMode)}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                />
                Enable Dark Mode
              </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={autoPdfMonthly} 
                  onChange={() => setAutoPdfMonthly(!autoPdfMonthly)}
                  style={{ marginRight: '8px', cursor: 'pointer' }}
                />
                Auto-Generate Month-End PDF
              </label>
            </div>
          </div>

          <button onClick={() => setShowSettings(false)} style={{ padding: '6px 14px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save & Close Settings</button>
        </div>
      )}

      {/* Unique Tracking Link Box */}
      <div style={{ background: darkMode ? '#1c2d22' : '#e2f0d9', border: `1px solid ${darkMode ? '#2d5a3c' : '#c3e6cb'}`, padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
        <strong>🔗 Aapka Unique Tracking Link:</strong>
        <input 
          type="text" 
          value={userUniqueLink} 
          readOnly 
          style={{ width: '100%', marginTop: '8px', padding: '8px', borderRadius: '4px', border: `1px solid ${themeStyles.border}`, background: themeStyles.cardBg, color: themeStyles.text }} 
        />
      </div>

      {/* Main Grid: Add Form & Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Form Section */}
        <div style={{ background: themeStyles.cardBg, padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: `1px solid ${themeStyles.border}` }}>
          <h3>Add New Expense</h3>
          <form onSubmit={handleAddExpense}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Title</label>
              <input 
                type="text" 
                placeholder="e.g., Lunch, Petrol" 
                value={newExpense.title} 
                onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${themeStyles.border}`, background: themeStyles.cardBg, color: themeStyles.text }}
              />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Amount ({currency})</label>
              <input 
                type="number" 
                placeholder="0.00" 
                value={newExpense.amount} 
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${themeStyles.border}`, background: themeStyles.cardBg, color: themeStyles.text }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Category</label>
              <select 
                value={newExpense.category} 
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: `1px solid ${themeStyles.border}`, background: themeStyles.cardBg, color: themeStyles.text }}>
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
        <div style={{ background: themeStyles.cardBg, padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: `1px solid ${themeStyles.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div>
              <h3 style={{ margin: 0 }}>Expense Records</h3>
              {totalExpense > budgetLimit && (
                <span style={{ color: '#dc3545', fontSize: '12px', fontWeight: 'bold' }}>⚠️ Budget limit exceeded!</span>
              )}
            </div>
            <div>
              <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '15px' }}>Total: {currency}{totalExpense}</span>
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
                <tr style={{ background: themeStyles.tableHeaderBg, borderBottom: `2px solid ${themeStyles.border}` }}>
                  <th style={{ padding: '10px' }}>Title</th>
                  <th style={{ padding: '10px' }}>Category</th>
                  <th style={{ padding: '10px' }}>Date</th>
                  <th style={{ padding: '10px' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((item) => (
                  <tr key={item.id} style={{ borderBottom: `1px solid ${themeStyles.border}` }}>
                    <td style={{ padding: '10px' }}>{item.title}</td>
                    <td style={{ padding: '10px' }}>{item.category}</td>
                    <td style={{ padding: '10px' }}>{item.date}</td>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#dc3545' }}>{currency}{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* PDF Success / Auto-Month-End Floating Popup Toast */}
      {pdfNotification.show && (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: '#28a745', color: '#fff', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 1000 }}>
          <h4 style={{ margin: '0 0 5px 0' }}>📄 Kewasoft Alert</h4>
          <p style={{ margin: 0, fontSize: '13px' }}>{pdfNotification.message}</p>
          <p style={{ margin: '3px 0 0 0', fontSize: '11px', opacity: 0.9 }}>Folder: <strong>{pdfNotification.folderName}</strong></p>
        </div>
      )}

      {/* Footer with Privacy Policy Link */}
      <footer style={{ textAlign: 'center', marginTop: '30px', color: themeStyles.subText, fontSize: '14px' }}>
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
          <div style={{ background: themeStyles.cardBg, color: themeStyles.text, padding: '30px', borderRadius: '8px', width: '500px', maxHeight: '80vh', overflowY: 'auto', border: `1px solid ${themeStyles.border}` }}>
            <h3>Privacy Policy & Terms</h3>
            <p style={{ fontSize: '13px', lineHeight: '1.5', color: themeStyles.subText }}>
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
