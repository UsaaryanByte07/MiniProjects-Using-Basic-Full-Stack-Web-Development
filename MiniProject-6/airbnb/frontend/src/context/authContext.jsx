import { useEffect } from "react";
import authReducer from "./authReducer";
import { createContext, useReducer, useContext } from "react";

const authContext = createContext();

const initialState = {
  isLoggedIn: false,
  user: null,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);


  //When the browser refreshes, React state is lost.
  // We call /api/auth/me on startup to re-check if the session cookie is still valid.
  // If it is, we restore the auth state without forcing the user to log in again.
  useEffect(() => {
    fetch('/api/auth/me', {
      credentials: 'include',
        })
      .then((response) => response.json())
      .then((data) => {
        if (data.isLoggedIn) {
          dispatch({ type: "LOGIN", payload: { user: data.user } });
        }
      })
      .catch((error) => {
        console.error("Error fetching auth status:", error);
      });
  }, []);

  return (
    <authContext.Provider value={{ ...state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };