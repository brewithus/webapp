'use client';

import React, { createContext, useState, useEffect } from 'react';

interface UserLocationContextData {
  userLocation: google.maps.LatLngLiteral | null;
  isLoading: boolean;
  error: Error | null;
}

interface UserLocationProviderProps {
  children: React.ReactNode;
}

export const UserLocationContext = createContext<UserLocationContextData>({
  userLocation: null,
  isLoading: false,
  error: null,
});

export const UserLocationProvider: React.FC<UserLocationProviderProps> = ({
  children,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(
      //   (position) => {
      //     const { latitude, longitude } = position.coords;
      //     setUserLocation({ lat: latitude, lng: longitude });
      //     setIsLoading(false);
      //   },
      //   (error) => {
      //     console.error('Error getting user location:', error);
      //     setError(new Error(error.message));
      //     setIsLoading(false);
      //   },
      // );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setError(new Error('Geolocation is not supported by this browser.'));
      setIsLoading(false);
    }
  }, []);

  const contextValue: UserLocationContextData = {
    userLocation,
    isLoading,
    error,
  };

  return (
    <UserLocationContext.Provider value={contextValue}>
      {children}
    </UserLocationContext.Provider>
  );
};
