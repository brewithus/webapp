'use client';
import React, { createContext, useState, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';

interface GoogleMapsContextData {
  isLoaded: boolean;
  error: Error | null;
}

interface GoogleMapsProviderProps {
  children: React.ReactNode;
  googleMapsApiKey: string;
}

export const GoogleMapsContext = createContext<GoogleMapsContextData>({
  isLoaded: false,
  error: null,
});

export const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({
  children,
  googleMapsApiKey,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey,
    libraries: ['places', 'maps', 'marker', 'drawing'],
  });
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (loadError) {
      setError(loadError);
    }
  }, [loadError]);

  const contextValue: GoogleMapsContextData = {
    isLoaded,
    error,
  };

  return (
    <GoogleMapsContext.Provider value={contextValue}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
