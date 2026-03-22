import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useApi from '../hooks/useApi';
import Spinner from '../components/Spinner';

const HomeDetailsPage = () => {
  const { id: homeId } = useParams(); // reads :id from URL
  const { data, loading, error, refetch } = useFetch(`/api/guest/homes/${homeId}`);
  const { executeRequest, loading: isExecuting } = useApi();

  const home = data?.home;
  const wishlistIds = data?.wishlistIds ?? [];
  const isInWishlist = home ? wishlistIds.includes(home._id) : false;

  const handleWishlist = async () => {
    const endpoint = isInWishlist ? '/api/guest/wishlist/remove' : '/api/guest/wishlist/add';
    await executeRequest(endpoint, { method: 'POST', body: JSON.stringify({ _id: homeId }) });
    await refetch();
  };

  if (loading) return <Spinner />;
  if (error || !home) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="bg-glass-bg/80 backdrop-blur-xl border border-glass-border shadow-2xl rounded-3xl p-10 max-w-lg w-full text-center">
        <div className="text-6xl mb-6">🏜️</div>
        <h2 className="text-3xl font-extrabold text-glass-text mb-4">Home Not Found</h2>
        <p className="text-glass-text-muted mb-8 font-medium text-lg">
          {error || "The home you're looking for doesn't exist or has been removed."}
        </p>
        <a href="/homes" className="inline-block px-8 py-3.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover hover:-translate-y-1 transition-all font-bold text-lg">
          Browse Available Homes
        </a>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-glass-bg/60 backdrop-blur-2xl border border-glass-border shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
        {home.photoUrl && (
          <div className="md:w-1/2 min-h-[300px] md:min-h-full">
            <img src={home.photoUrl} alt={home.homeName} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-linear-to-r from-primary to-orange-400 bg-clip-text text-transparent mb-2">
                {home.homeName}</h1>
            </div>
          
          <div className="flex flex-col gap-3 mb-8">
            <p className="flex items-center gap-2 text-glass-text-muted font-medium text-lg">
              <span className="text-xl">📍</span> {home.location}
            </p>
            <p className="flex items-center gap-2 text-glass-text font-bold text-xl">
              <span className="text-xl">💰</span> ₹{home.price} <span className="text-sm font-normal text-glass-text-muted">/ night</span>
            </p>
            <p className="flex items-center gap-2 text-glass-text-muted font-medium text-lg">
              <div className="flex items-center gap-1.5"><span className="text-lg">⭐</span> {home.rating}</div>
            </p>
          </div>
          
          <div className="w-full h-px bg-glass-border/50 my-6"></div>
          
          <h3 className="text-xl font-bold text-glass-text mb-3">About this home</h3>
          <p className="text-glass-text-muted leading-relaxed mb-8 whitespace-pre-line">{home.description}</p>
          
          <button 
            disabled={isExecuting}
            onClick={handleWishlist}
            className={`mt-auto w-full py-4 rounded-xl border transition-all font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${
              isInWishlist 
                ? 'bg-glass-bg border-glass-border text-glass-text hover:bg-glass-border/50' 
                : 'bg-primary border-primary text-white shadow-lg shadow-primary/30 hover:bg-primary-hover'
            }`}
          >
            {isExecuting ? <div className={`h-6 w-6 animate-spin rounded-full border-2 border-t-transparent ${isInWishlist ? 'border-glass-text' : 'border-white'}`}></div> : (isInWishlist ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeDetailsPage;