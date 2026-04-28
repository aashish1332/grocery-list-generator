import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Auth({ setIsAuthenticated }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body = isLogin 
      ? { email: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text.includes('server error') ? 'Server error occurred. Please check backend logs.' : 'Unexpected response from server');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }


      // Store auth data for both login and registration
      localStorage.setItem('auth', 'true');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
      <motion.div 
        className="glass-panel" 
        style={{ padding: '3rem', width: '100%', maxWidth: '400px', textAlign: 'center' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        
        {error && (
          <div style={{ 
            padding: '0.75rem', 
            marginBottom: '1rem', 
            borderRadius: '8px', 
            backgroundColor: error.includes('created') ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
            color: error.includes('created') ? '#16a34a' : '#dc2626',
            fontSize: '0.9rem'
          }}>
            {error}
          </div>
        )}

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleAuth}>
          {!isLogin && (
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              className="form-input" 
              value={formData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)' }}
            />
          )}
          <input 
            type="email" 
            name="email"
            placeholder="Email Address" 
            className="form-input" 
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)' }}
          />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            className="form-input" 
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)' }}
          />
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ marginTop: '1rem', width: '100%', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)' }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button 
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }} 
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', marginLeft: '0.5rem', cursor: 'pointer' }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
