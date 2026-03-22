const HomeCard = ({ home, isInWishlist, onAddWishlist, onRemoveWishlist, isLoading }) => {
  return (
    <div className="group flex flex-col bg-glass-bg backdrop-blur-md border border-glass-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4">
      {home.photoUrl && <img src={home.photoUrl} alt={home.homeName} className="w-full h-48 object-cover rounded-xl mb-4" />}
      <div className="flex flex-col grow">
        <h3 className="text-lg font-bold text-glass-text mb-1 truncate">{home.homeName}</h3>
        <p className="text-glass-text-muted text-sm mb-2 truncate">{home.location}</p>
        <p className="font-bold text-glass-text mb-2">₹{home.price} <span className="text-sm font-normal text-glass-text-muted">/ night</span></p>
        <p className="text-sm font-medium text-glass-text-muted mb-4">{home.rating} ★</p>
        {(onAddWishlist || onRemoveWishlist) && (
          <button 
            disabled={isLoading}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); isInWishlist ? onRemoveWishlist(home._id) : onAddWishlist?.(home._id); }}
            className="mt-auto w-full py-2.5 rounded-xl bg-glass-bg border border-glass-border text-glass-text hover:bg-glass-border hover:shadow-sm transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></div> : (isInWishlist ? 'Remove Wishlist' : 'Add to Wishlist')}
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeCard;