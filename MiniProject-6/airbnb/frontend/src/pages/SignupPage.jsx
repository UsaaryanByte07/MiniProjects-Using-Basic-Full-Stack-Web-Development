import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import Spinner from '../components/Spinner';

const SignupPage = () => {
  const { executeRequest, loading } = useApi();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '',
    confirmPassword: '', userType: 'guest', terms: false,
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const result = await executeRequest('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ ...form, terms: form.terms ? 'on' : '' }),
    });

    if (result.success) {
      navigate(result.data.redirectTo);
    } else if (result.data?.errors) {
      setErrors(result.data.errors); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
      <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border shadow-2xl rounded-3xl p-8 max-w-xl w-full">
        <h1 className="text-3xl font-extrabold text-glass-text mb-8 text-center">Create Account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
            <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
          </div>
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-glass-text-muted">I want to...</label>
            <select name="userType" value={form.userType} onChange={handleChange} className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium cursor-pointer">
              <option value="guest" className="text-black">Sign up as a Guest (Browse & Book)</option>
              <option value="host" className="text-black">Sign up as a Host (List Homes)</option>
            </select>
          </div>

          <label className="flex items-center gap-3 cursor-pointer mt-2">
            <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="w-5 h-5 rounded border-glass-border text-primary focus:ring-primary/50 cursor-pointer" />
            <span className="text-sm font-medium text-glass-text-muted select-none">I agree to the <span className="text-primary hover:underline">Terms & Conditions</span></span>
          </label>

          {errors.map((err, i) => <p key={i} className="text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-medium">{err.msg}</p>)}
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover disabled:opacity-70 disabled:hover:bg-primary transition-all font-bold text-lg mt-2 flex items-center justify-center">
            {loading ? <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div> : 'Sign Up'}
          </button>
        </form>
        <div className="mt-8 text-center text-sm font-medium">
          <Link to="/login" className="text-glass-text-muted hover:text-primary transition-colors">Already have an account? <span className="font-bold">Login</span></Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;