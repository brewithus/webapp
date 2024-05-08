'use client';
import React, { useState, useCallback, useContext } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

import { cn } from '@/lib/utils';
import { GoogleMapsContext } from '@/context/google-maps';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded } = useContext(GoogleMapsContext);
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
        'text-md flex h-[300px] w-[300px] items-center text-center font-medium',
        className,
      )}
    >
      Loading maps
    </div>
  );
};

export default MapContainer;
