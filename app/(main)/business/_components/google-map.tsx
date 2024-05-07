'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { googleMapsApiKey } from '@/config/google-maps';
import { cn } from '@/lib/utils';

interface MapContainerProps {
  className?: string;
}

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '4px',
};

const defaultCPP = {
  lat: 34.059559139616,
  lng: -117.8242167716281,
};

const MapContainer: React.FC<MapContainerProps> = ({ className }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey, // Ensure your API key is correctly provided
    libraries: ['places', 'maps', 'marker', 'drawing'],
  });

  const [, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting user location:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className={cn('h-full w-full', className)}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation ?? defaultCPP}
        onLoad={(map) => {
          if (userLocation) {
            const bounds = new window.google.maps.LatLngBounds(userLocation);
            map.fitBounds(bounds);
          }
        }}
        onUnmount={onUnmount}
        options={{ maxZoom: 18 }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={userLocation ?? defaultCPP} />
      </GoogleMap>
    </div>
  ) : (
    <div
      className={cn(
        'h-[300px] w-[300px] flex items-center text-center text-md font-medium',
        className,
      )}
    >
      Loading maps
    </div>
  );
};

export default MapContainer;
