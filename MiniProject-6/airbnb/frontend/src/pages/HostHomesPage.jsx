import useFetch from '../hooks/useFetch';
import useApi from '../hooks/useApi';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const HostHomesPage = () => {
  const { data, loading, error, refetch } = useFetch('/api/host/homes');
  const { executeRequest } = useApi();
  const homes = data?.homes ?? [];

  const handleDelete = async (homeId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    const result = await executeRequest(`/api/host/delete-home/${homeId}`, { method: 'DELETE' });
    if (result.success) refetch();
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
        <h1 className="text-4xl font-extrabold text-glass-text">My Listings</h1>
        <Link to="/host/add-home" className="px-6 py-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover hover:-translate-y-1 transition-all font-bold text-sm">+ Add New Home</Link>
      </div>
      
      {homes.length === 0 ? (
        <div className="bg-glass-bg/60 backdrop-blur-md border border-glass-border rounded-3xl p-12 text-center shadow-lg">
          <p className="text-xl text-glass-text-muted font-medium mb-6">You haven't listed any homes yet.</p>
          <Link to="/host/add-home" className="inline-block px-8 py-3 bg-glass-bg text-primary border-2 border-primary rounded-xl hover:bg-primary hover:text-white transition-all font-bold">List your first home</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homes.map(home => (
            <div key={home._id} className="bg-glass-bg backdrop-blur-md border border-glass-border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex flex-col">
              {home.photoUrl && <img src={home.photoUrl} alt={home.homeName} className="w-full h-48 object-cover rounded-xl mb-4" />}
              <h3 className="text-xl font-bold text-glass-text mb-2 truncate">{home.homeName}</h3>
              <p className="text-glass-text-muted text-sm font-medium mb-6 grow">📍 {home.location} <br /> 💰 ₹{home.price} <span className="text-xs">/ night</span></p>
              
              <div className="flex gap-3 mt-auto">
                <Link to={`/host/edit-home/${home._id}`} className="flex-1 text-center py-2.5 bg-glass-bg border border-glass-border text-glass-text rounded-xl hover:bg-glass-border hover:-translate-y-0.5 shadow-sm transition-all font-semibold text-sm">Edit</Link>
                <button onClick={() => handleDelete(home._id)} className="flex-1 py-2.5 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white hover:-translate-y-0.5 shadow-sm transition-all font-semibold text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HostHomesPage;