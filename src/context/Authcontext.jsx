import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from cookie on refresh
  useEffect(() => {
    const storedUser = Cookies.get("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login
  const login = (userData, token) => {
    Cookies.set("token", token, {
      expires: 7,
    });

    Cookies.set("user", JSON.stringify(userData), {
      expires: 7,
    });

    setUser(userData);
  };

  // Logout
  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    // setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};