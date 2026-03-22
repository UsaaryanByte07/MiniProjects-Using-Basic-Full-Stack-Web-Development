import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-glass-bg/60 backdrop-blur-xl border border-glass-border shadow-2xl rounded-3xl p-10 max-w-2xl w-full text-center">
        <h1 className="text-5xl font-extrabold bg-linear-to-r from-primary to-orange-400 bg-clip-text text-transparent mb-6 pt-2 pb-2">Welcome to Airbnb</h1>
        {isLoggedIn ? (
          <div className="space-y-6">
            <p className="text-xl text-glass-text-muted">Hello, <span className="font-semibold text-glass-text">{user.firstName}</span>! Ready to explore?</p>
            <div className="flex justify-center gap-4">
              {user.userType === 'guest' && <Link to="/homes" className="px-8 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover hover:-translate-y-1 transition-all font-semibold text-lg">Browse Homes</Link>}
              {user.userType === 'host' && <Link to="/host/host-homes" className="px-8 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover hover:-translate-y-1 transition-all font-semibold text-lg">Manage Listings</Link>}
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <p className="text-xl text-glass-text-muted">Discover unique homes around the world.</p>
            <div className="flex justify-center gap-4">
              <Link to="/login" className="px-8 py-3 bg-glass-bg border border-glass-border text-glass-text rounded-xl hover:bg-glass-border shadow-sm hover:-translate-y-1 transition-all font-semibold text-lg">Login</Link>
              <Link to="/signup" className="px-8 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover hover:-translate-y-1 transition-all font-semibold text-lg">Sign Up</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;