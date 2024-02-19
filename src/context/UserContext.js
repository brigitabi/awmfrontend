import React from 'react';

export const UserContext = React.createContext({ user: undefined });

export function useUser() {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserContext.Provider');
  }

  return context;
}
