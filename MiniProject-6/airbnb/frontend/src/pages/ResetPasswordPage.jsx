import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import Spinner from '../components/Spinner';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const { executeRequest, loading, error } = useApi();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const result = await executeRequest('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, token, ...form }),
    });

    if (result.success) {
      navigate('/login');
    } else if (result.data?.errors) {
      setErrors(result.data.errors);
    }
  };

  if (!token || !email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border shadow-2xl rounded-3xl p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Invalid Reset Link</h1>
          <p className="text-glass-text-muted mb-8 font-medium">This password reset link is invalid or has expired.</p>
          <Link to="/forgot-password" className="inline-block px-6 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all font-bold">Request a new reset link</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border shadow-2xl rounded-3xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-glass-text mb-4 text-center">Reset Password</h1>
        <p className="text-glass-text-muted text-center mb-8 font-medium">Enter your new password below.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="password" type="password" placeholder="New Password"
            value={form.password} onChange={handleChange} required
            className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
          />
          <input
            name="confirmPassword" type="password" placeholder="Confirm New Password"
            value={form.confirmPassword} onChange={handleChange} required
            className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
          />
          {error && <p className="text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-medium">{error}</p>}
          {errors.map((err, i) => (
            <p key={i} className="text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-medium">{err.msg}</p>
          ))}
          <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover disabled:opacity-70 disabled:hover:bg-primary transition-all font-bold text-lg mt-2 flex items-center justify-center gap-2">
            {loading ? <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div> : 'Reset Password'}
          </button>
        </form>
        <div className="mt-8 flex justify-center text-sm font-medium">
          <Link to="/login" className="text-glass-text-muted hover:text-primary transition-colors">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
