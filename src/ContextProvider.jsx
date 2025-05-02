import React, { createContext, useEffect, useState } from "react";

// You can improve typing here if using TypeScript
export const AppContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    setUser(user);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
