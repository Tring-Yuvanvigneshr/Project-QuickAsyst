import React, { createContext, useState } from 'react';

export const LeagueContext = createContext(null);

export const LeagueProvider = ({ children }) => {
  const [leagueName, setLeagueName] = useState(null);

  return (
    <LeagueContext.Provider value={{ leagueName, setLeagueName }}>
      {children}
    </LeagueContext.Provider>
  );
};
