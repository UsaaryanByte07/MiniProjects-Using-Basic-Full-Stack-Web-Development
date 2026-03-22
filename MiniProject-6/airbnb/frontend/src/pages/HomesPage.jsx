import useFetch from '../hooks/useFetch';
import useApi from '../hooks/useApi';
import HomeCard from '../components/HomeCard';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useState } from 'react';

const HomesPage = () => {
  const { data, loading, error, refetch } = useFetch('/api/guest/homes');
  const { executeRequest } = useApi();

  const homes = data?.homes ?? [];
  const wishlistIds = data?.wishlistHomeIds ?? data?.wishlistIds ?? [];

  const [loadingId, setLoadingId] = useState(null);

  const handleAddWishlist = async (homeId) => {
    setLoadingId(homeId);
    await executeRequest('/api/guest/wishlist/add', { method: 'POST', body: JSON.stringify({ _id: homeId }) });
    await refetch(); // re-fetch to update wishlist button states
    setLoadingId(null);
  };

  const handleRemoveWishlist = async (homeId) => {
    setLoadingId(homeId);
    await executeRequest('/api/guest/wishlist/remove', { method: 'POST', body: JSON.stringify({ _id: homeId }) });
    await refetch();
    setLoadingId(null);
  };

  if (!data && loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-extrabold text-glass-text mb-8">Available Homes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {homes.map(home => (
          <div key={home._id}>
            <Link to={`/homes/${home._id}`}>
              <HomeCard
                home={home}
                isInWishlist={wishlistIds.includes(home._id)}
                onAddWishlist={handleAddWishlist}
                onRemoveWishlist={handleRemoveWishlist}
                isLoading={loadingId === home._id}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomesPage;