import useFetch from '../hooks/useFetch';
import useApi from '../hooks/useApi';
import HomeCard from '../components/HomeCard';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const WishlistPage = () => {
  const { data, loading, error, refetch } = useFetch('/api/guest/wishlist');
  const { executeRequest } = useApi();
  const wishlist = data?.wishlist ?? [];

  const [loadingId, setLoadingId] = useState(null);

  const handleRemove = async (homeId) => {
    setLoadingId(homeId);
    await executeRequest('/api/guest/wishlist/remove', { method: 'POST', body: JSON.stringify({ _id: homeId }) });
    await refetch();
    setLoadingId(null);
  };

  if (!data && loading) return <Spinner />;
  if (error) return <p className="text-red-500 text-center py-10 font-bold">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 min-h-[70vh]">
      <h1 className="text-4xl font-extrabold text-glass-text mb-8">Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="bg-glass-bg/60 backdrop-blur-md border border-glass-border rounded-3xl p-12 text-center shadow-lg max-w-lg mx-auto mt-10">
          <p className="text-xl text-glass-text-muted font-medium mb-6">Your wishlist is currently empty.</p>
          <a href="/homes" className="inline-block px-8 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover hover:-translate-y-1 transition-all font-bold">Explore Homes</a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {wishlist.map(home => (
            <div key={home._id}>
              <Link to={`/homes/${home._id}`}>
                <HomeCard home={home} isInWishlist={true} onRemoveWishlist={handleRemove} isLoading={loadingId === home._id} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishlistPage;