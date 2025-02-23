import React, { createContext, useState } from 'react';

// Create the context
export const LevelContext = createContext();

// Create the provider component
export function LevelProvider({ children }) {
  const [level, setLevel] = useState(1);
  const [mode, setMode] = useState(false); // false for light mode, true for dark mode

  // Values to be provided to consuming components
  const value = {
    level: [level, setLevel],
    mode: [mode, setMode],
  };

  return (
    <LevelContext.Provider value={value}>
      {children}
    </LevelContext.Provider>
  );
}