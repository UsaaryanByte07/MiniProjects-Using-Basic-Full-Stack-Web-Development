import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="bg-glass-bg/60 backdrop-blur-xl border border-glass-border shadow-2xl rounded-3xl p-12 max-w-lg w-full text-center">
        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-linear-to-r from-primary to-orange-400 mb-6 pb-2">404</h1>
        <h2 className="text-3xl font-bold text-glass-text mb-4">Page Not Found</h2>
        <p className="text-glass-text-muted mb-8 font-medium text-lg">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="inline-block px-8 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover hover:-translate-y-1 transition-all font-bold text-lg">Go Home</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;