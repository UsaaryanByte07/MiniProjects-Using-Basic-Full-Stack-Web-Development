import { useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import Spinner from '../components/Spinner';

const ForgotPasswordPage = () => {
  const { executeRequest, loading, error } = useApi();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    const result = await executeRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });

    if (result.success) {
      setSuccessMessage(result.data.message || 'Password reset email sent. Check your inbox!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border shadow-2xl rounded-3xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-extrabold text-glass-text mb-4 text-center">Forgot Password</h1>
        <p className="text-glass-text-muted text-center mb-8 font-medium">Enter your email address and we'll send you a link to reset your password.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="email" type="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
          />
          {error && <p className="text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-medium">{error}</p>}
          {successMessage && <p className="text-green-500 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-xl text-sm font-medium">{successMessage}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover disabled:opacity-70 disabled:hover:bg-primary transition-all font-bold text-lg mt-2 flex items-center justify-center gap-2">
            {loading ? <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div> : 'Send Reset Link'}
          </button>
        </form>
        <div className="mt-8 flex justify-center text-sm font-medium">
          <Link to="/login" className="text-glass-text-muted hover:text-primary transition-colors">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
