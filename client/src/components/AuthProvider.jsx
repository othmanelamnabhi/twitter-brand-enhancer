import { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticatedUser, setAuthenticatedUser] = useState({
    authenticated: false,
    user: null,
  });

  useEffect(() => {
    fetch("/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("failed to authenticate user");
      })
      .then((responseJson) => {
        const authInfo = {
          authenticated: true,
          user: responseJson.user,
        };
        setAuthenticatedUser(authInfo);
      })
      .catch((error) => {
        setAuthenticatedUser({
          authenticated: false,
          error: "Failed to authenticate user",
        });
      });
  }, []);

  const handleSignInClick = () => {
    window.open("/auth/twitter", "_self");
  };

  const handleLogoutClick = () => {
    window.open("/auth/logout", "_self");
    handleNotAuthenticated();
  };

  const handleNotAuthenticated = () => {
    setAuthenticatedUser({ authenticated: false });
  };

  return (
    <AuthContext.Provider
      value={{ authenticatedUser, handleLogoutClick, handleSignInClick }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }) {
  let {
    authenticatedUser: { authenticated },
  } = useAuth();

  if (!authenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/' />;
  }

  return children;
}
