'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface FilterContextType {
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
  matchedVehicles: number;
  setMatchedVehicles: (count: number) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [showFavorites, setShowFavorites] = useState(false);
  const [matchedVehicles, setMatchedVehicles] = useState(0);

  return (
    <FilterContext.Provider value={{
      showFavorites,
      setShowFavorites,
      matchedVehicles,
      setMatchedVehicles,
    }}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}
