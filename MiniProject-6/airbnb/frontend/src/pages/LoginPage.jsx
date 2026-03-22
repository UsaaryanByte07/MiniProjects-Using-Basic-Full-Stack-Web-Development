import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useApi from '../hooks/useApi';
import Spinner from '../components/Spinner';

const LoginPage = () => {
  const { dispatch } = useAuth();
  const { executeRequest, loading, error } = useApi();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await executeRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    if (result.success) {
      dispatch({ type: 'LOGIN', payload: { user: result.data.user } });
      navigate('/');
    } else if (result.data?.redirectTo) {
      navigate(result.data.redirectTo); // redirect to verify-otp if not verified
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border shadow-2xl rounded-3xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-glass-text mb-6 text-center">Welcome Back</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required 
            className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
          />
          <input 
            name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required 
            className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
          />
          {error && <p className="text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-medium">{error}</p>}
          <button 
            type="submit" disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover disabled:opacity-70 disabled:hover:bg-primary transition-all font-bold text-lg mt-2 flex justify-center items-center gap-2"
          >
            {loading ? <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div> : 'Login'}
          </button>
        </form>
        <div className="mt-8 flex flex-col items-center gap-3 text-sm font-medium">
          <Link to="/signup" className="text-glass-text-muted hover:text-primary transition-colors">Don't have an account? Sign up</Link>
          <Link to="/forgot-password" className="text-glass-text-muted hover:text-primary transition-colors">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;