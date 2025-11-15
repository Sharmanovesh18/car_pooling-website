import React, { useState } from 'react';
import axios from 'axios';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const saveUser = (user, token) => {
    const currentUser = { ...user, token };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    window.dispatchEvent(new Event('auth-changed'));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'register') {
        const res = await axios.post('http://localhost:5000/api/auth/register', {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        });
        if (res.data && res.data.user) {
          saveUser(res.data.user, res.data.token);
          onClose();
        } else {
          setError(res.data?.message || 'Registration failed');
        }
      } else {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: form.email,
          password: form.password,
        });
        if (res.data && res.data.token) {
          saveUser(res.data.user, res.data.token);
          onClose();
        } else {
          setError(res.data?.message || 'Login failed');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose}>×</button>
        <div className="auth-tabs">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>Login</button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>Register</button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
          )}
          {mode === 'register' && (
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
          )}
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required />
          <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required />

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
