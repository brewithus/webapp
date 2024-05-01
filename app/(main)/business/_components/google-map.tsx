'use client';
import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { googleMapsApiKey } from '@/config/google-maps';
import { cn } from '@/lib/utils';

interface MapContainerProps {
  className?: string;
  position?: { lat: number; lng: number }; // position prop for latitude and longitude
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

const MapContainer: React.FC<MapContainerProps> = ({ className, position }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey, // Ensure your API key is correctly provided
    libraries: ['places', 'maps', 'marker', 'drawing'],
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className={cn('h-full w-full', className)}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position ?? defaultCPP}
        onLoad={(map) => {
          const bounds = new window.google.maps.LatLngBounds(
            position ?? defaultCPP,
          );
          map.fitBounds(bounds);
        }}
        onUnmount={onUnmount}
        options={{ maxZoom: 18 }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <Marker position={position ?? defaultCPP} />
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
