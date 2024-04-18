'use client';

import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import styles from "../_styles/map.module.css";

interface GoogleMapsProps {
  id: string;
  address: string;
  hours: string;
  phone: string;
}

/**
 * Loads a Google Map instance with a marker.
 * @param {GoogleMapsProps} props The component props.
 * @returns {JSX.Element} The component element.
 */
export default function GoogleMaps({ id, address, hours, phone }: GoogleMapsProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure the API key is defined
    const apiKey = process.env.NEXT_PUBLIC_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is undefined.');
      return;
    }

    const loader = new Loader({
      apiKey: apiKey, // Use the validated API key
      version: 'weekly',
    });

    loader.load().then((google) => {
      if (!mapRef.current) {
        console.error('Google Maps div reference is null');
        return;  // Safely handle potentially null ref
      }

      const locationInMap = { lat: 34.05873725393651, lng: -117.81998748930027 };
      const map = new google.maps.Map(mapRef.current, {
        center: locationInMap,
        zoom: 15,
      });

      // Marker is used here to ensure no lint errors for unused variables
      const marker = new google.maps.Marker({
        position: locationInMap,
        map: map,
      });
      // Use the marker or console log it to avoid unused variable errors
      console.log(marker); // This is just to use 'marker', typically you wouldn't need this line

    }).catch(error => {
      console.error('Error loading the Google Maps script:', error);
    });
  }, []);  // Ensuring useEffect has the correct dependencies

  return (
    <div className={styles.container}>
      <p className={styles.location_hour}>Location & Hours</p>
      <div style={{ display: 'flex', height: '300px', width: '100%', overflow: 'hidden' }}>
        {/* Map container */}
        <div 
          ref={mapRef} 
          style={{ width: '50%', height: '100%' }}
        />

        {/* Information container */}
        <div style={{
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            maxWidth: '300px',
            margin: '20px',
          }}>
          <a href={`http://${id}.com`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ marginRight: '8px' }}>🔗</span>
              {id + ".com"}
            </div>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ marginRight: '8px' }}>📞</span>
            {phone}
          </div>

          <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ marginRight: '8px' }}>📍</span>
              Get Directions
            </div>
            <p style={{ margin: '0' }}>{address}</p>
          </a>
        </div>
      </div>
    </div>
  );
}
