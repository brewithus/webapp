'use client';

import React, { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import styles from "../styles/map.module.css";
interface GoogleMapsProps {
    id: string;
    address: string;
    hours: string;
    phone: string;
  }

  export default function GoogleMaps({ id, address, hours, phone }: GoogleMapsProps) {
    const mapRef = React.useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly', // changed 'quartely' to 'weekly' as it's a valid version type
      });
  
      loader.load().then((google) => {
        const locationInMap = {
          lat: 34.05873725393651,
          lng: -117.81998748930027,
        };
  
        const map = new google.maps.Map(mapRef.current!, {
          center: locationInMap,
          zoom: 15,
        });
  
        new google.maps.Marker({
          position: locationInMap,
          map: map,
        });
      });
    }, []);
  
    return (
        <div className={styles.container}>
            <p className={styles.location_hour}>
            Location & Hours
            </p>
            <div style={{ display: 'flex', height: '300px', width: '100%', overflow: 'hidden' }}>
                {/* Map container */}
                <div 
                ref={mapRef} 
                style={{ width: '50%', height: '100%' }}
                />
            
                {/* Information container */}
                <div style={{
  
                    padding: '20px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // simple box-shadow for card effect
                    borderRadius: '8px', // rounded corners
                    maxWidth: '300px', // maximum width of the card
                    margin: '20px', // add some margin to separate card from other elements
                    }}>
                    <a href="https://hanumanthaieatery.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ marginRight: '8px' }}>🔗</span> {/* Replace with an actual icon */}
                        {id+".com"}
                        </div>
                    </a>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ marginRight: '8px' }}>📞</span> {/* Replace with an actual icon */}
                        {phone}
                    </div>

                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <span style={{ marginRight: '8px' }}>📍</span> {/* Replace with an actual icon */}
                        Get Directions
                        </div>
                        <p style={{ margin: '0' }}>{address}</p>
                    </a>
                </div>
            </div>
      </div>
    );
  }