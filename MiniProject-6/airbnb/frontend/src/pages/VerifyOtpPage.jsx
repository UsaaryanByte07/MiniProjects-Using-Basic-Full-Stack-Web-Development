import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import Spinner from '../components/Spinner';

const VerifyOtpPage = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [otp, setOtp] = useState('');
  const { executeRequest, loading, error } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await executeRequest('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
    if (result.success) navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border shadow-2xl rounded-3xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold text-glass-text mb-4">Verify Your Email</h1>
        <p className="text-glass-text-muted mb-8 font-medium">Enter the 6-digit OTP sent to <strong className="text-glass-text">{email}</strong></p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
          <input 
            type="text" maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" required 
            className="w-full px-4 py-3 text-center tracking-[0.5em] font-bold text-2xl bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all uppercase"
          />
          {error && <p className="text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-medium">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover disabled:opacity-70 disabled:hover:bg-primary transition-all font-bold text-lg mt-2 flex items-center justify-center gap-2">
            {loading ? <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div> : 'Verify OTP'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtpPage;