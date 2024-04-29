import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    // Retrieve user and access token from local storage on component mount
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedUser && storedAccessToken) {
      setUser(storedUser);
      setAccessToken(storedAccessToken);
    }
  }, []);

  const login = (userData) => {
    setUser(userData.user);
    setAccessToken(userData.access_token);

    // Store user and access token in local storage
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("accessToken", userData.access_token);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);

    // Remove user and access token from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
