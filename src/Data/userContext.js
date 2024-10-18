// userContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Simulate fetching user data
    const fetchUserData = () => {
      const fetchedUser = JSON.parse(localStorage.getItem("user")); 
      setUser(fetchedUser);
      setLoading(false); 
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext); 
};
