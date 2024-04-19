import React from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { googleMapsApiKey } from '@/config/google-maps';
import { Input } from '../ui/input';

interface Props {
  defaultAddress?: string;
  onSelectAddress: (address: string) => void;
}

const GoogleMapsSearchAutocomplete: React.FC<Props> = ({
  onSelectAddress,
  defaultAddress,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey, // Ensure your API key is correctly provided
    libraries: ['places', 'maps', 'marker', 'drawing'],
  });
  const [searchResult, setSearchResult] =
    React.useState<google.maps.places.Autocomplete>();

  function onLoad(autocomplete: google.maps.places.Autocomplete) {
    setSearchResult(autocomplete);
  }

  function locationSelected() {
    if (searchResult) {
      const place = searchResult.getPlace();
      onSelectAddress(place.formatted_address ?? '');
    }
  }

  if (!isLoaded) {
    return <div className="text-sm text-primary">Loading locations</div>;
  }
  return (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={locationSelected}
      options={{ componentRestrictions: { country: 'us' } }}
    >
      <Input
        type="text"
        placeholder={defaultAddress ?? 'Search'}
        className="bg-transparent py-3 text-sm outline-none placeholder:text-black/50 disabled:cursor-not-allowed disabled:opacity-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black"
      />
    </Autocomplete>
  );
};

export default GoogleMapsSearchAutocomplete;
