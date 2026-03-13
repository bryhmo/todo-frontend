import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Register() {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true); setError('');
    try {
      const res = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      login(res.data.user, res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">✓ TodoApp</div>
        <h1 className="auth-title">Create account</h1>
        <p className="auth-sub">Start managing your tasks today</p>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Isiaka Ibrahim" required
              value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="your@email.com" required
              value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required
              value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" required
              value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} />
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <span style={{color: '#ff4d6d', fontSize: '0.78rem', marginTop: '4px'}}>
                ⚠ Passwords do not match
              </span>
            )}
            {form.confirmPassword && form.password === form.confirmPassword && (
              <span style={{color: 'var(--accent2)', fontSize: '0.78rem', marginTop: '4px'}}>
                ✓ Passwords match
              </span>
            )}
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>
        <div className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}