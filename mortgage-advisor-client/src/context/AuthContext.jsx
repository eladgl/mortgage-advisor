import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // Import axios to make a request to your server
import { isTokenValid } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(isTokenValid());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isTokenValid()) {
        try {
          // Assume you have an endpoint to fetch user data based on the token
          const response = await axios.get("http://localhost:3001/userData", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
