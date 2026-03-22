import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useApi from "../hooks/useApi";

const Navbar = () => {
  const { isLoggedIn, user, dispatch } = useAuth();
  const { executeRequest } = useApi();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const res = await executeRequest("/api/auth/logout", { method: "POST" });
    if (res.success) {
      dispatch({ type: "LOGOUT" });
      navigate("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-glass-bg/80 backdrop-blur-xl border-b border-glass-border shadow-sm px-6 py-4 flex items-center justify-between text-glass-text transition-all duration-300">
      <Link to="/" className="text-2xl font-bold bg-linear-to-r from-primary to-orange-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"> Airbnb </Link>
      <div className="flex items-center gap-6 font-medium">
        {isLoggedIn ? (
          <>
            {user?.userType === "guest" && (
              <div className="flex gap-4">
                <Link to="/homes" className="hover:text-primary transition-colors">Homes</Link>
                <Link to="/wishlist" className="hover:text-primary transition-colors">Wishlist</Link>
              </div>
            )}
            {user?.userType === "host" && (
              <div className="flex gap-4">
                <Link to="/host/host-homes" className="hover:text-primary transition-colors">My Listings</Link>
                <Link to="/host/add-home" className="hover:text-primary transition-colors">Add Home</Link>
              </div>
            )}
            <span className="hidden sm:inline bg-glass-border px-3 py-1 rounded-full text-sm">Hello, {user?.firstName}!</span>
            <button onClick={handleLogout} className="px-4 py-2 bg-glass-bg border border-glass-border rounded-xl hover:bg-glass-border transition-colors text-sm text-glass-text font-semibold">Logout</button>
          </>
        ) : (
          <div className="flex gap-4 items-center">
            <Link to="/login" className="hover:text-primary transition-colors font-semibold">Login</Link>
            <Link to="/signup" className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors font-semibold shadow-md shadow-primary/20">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
