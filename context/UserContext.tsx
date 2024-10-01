import React, { createContext, useContext, useState } from "react";

interface UserContextType {
  refreshUsers: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshUsers = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <UserContext.Provider value={{ refreshUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
