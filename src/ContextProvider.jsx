import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    } catch (e) {
      console.error("Failed to parse stored user:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user !== null) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AppContext.Provider value={{ user, setUser, loading, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
