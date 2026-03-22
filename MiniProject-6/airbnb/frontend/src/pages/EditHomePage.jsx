import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import useApi from '../hooks/useApi';
import Spinner from '../components/Spinner';

const EditHomePage = () => {
  const { id: homeId } = useParams();
  const { data, loading: fetching } = useFetch(`/api/host/home/${homeId}`);
  const { executeRequest, loading, error } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const result = await executeRequest(`/api/host/edit-home/${homeId}`, { method: 'PUT', body: formData });
    if (result.success) navigate('/host/host-homes');
  };

  if (fetching) return <Spinner />;
  const home = data?.home;
  if (!home) return <Spinner />;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-8">
      <div className="w-full max-w-2xl bg-glass-bg backdrop-blur-xl border border-glass-border p-8 sm:p-10 rounded-3xl shadow-2xl relative mb-12">
        <h2 className="text-4xl font-extrabold text-center mb-8 bg-linear-to-r from-primary to-orange-400 bg-clip-text text-transparent">Edit Your Space</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-5">
          <input name="homeName" defaultValue={home?.homeName} placeholder="Home Name" required className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input name="price" type="number" defaultValue={home?.price} placeholder="Price" required className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
            <input name="location" defaultValue={home?.location} placeholder="Location" required className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
          </div>
          <input name="rating" type="number" step="0.1" defaultValue={home?.rating} placeholder="Rating" required className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
          <textarea name="description" defaultValue={home?.description} rows="4" className="w-full px-4 py-3 bg-glass-bg border border-glass-border rounded-xl text-glass-text placeholder-glass-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium resize-none"></textarea>
          
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-glass-text-muted">Home Photo</label>
            {home?.photoUrl && (
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-glass-border mb-2">
                 <img src={home.photoUrl} alt="Current" className="w-full h-full object-cover" />
              </div>
            )}
            <input name="photo" type="file" accept="image/jpg,image/jpeg,image/png" className="w-full text-glass-text file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover file:transition-all file:cursor-pointer p-2 bg-glass-bg border border-glass-border rounded-xl" />
          </div>
          {error && <p className="text-red-500 bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-medium">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-hover disabled:opacity-70 disabled:hover:bg-primary transition-all font-bold text-lg mt-4 flex items-center justify-center">
            {loading ? <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div> : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditHomePage;