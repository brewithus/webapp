'use client';

// components/PlacesCombobox.tsx
import * as React from 'react';
import { useLoadScript } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command';
import { Icons } from '../icons';
import { useDebounce } from '@/hooks/debounce';
import { googleMapsApiKey } from '@/config/google-maps';

interface PlacesAutocompleteProps {
  onSelectAddress: (address: string) => void;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  onSelectAddress,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey, // Ensure your API key is correctly provided
    libraries: ['places', 'maps', 'marker', 'drawing'],
  });

  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: { region: 'us' },
    initOnMount: true,
  });

  React.useEffect(() => {
    console.log('status', status, 'data', data);
  }, [data, status]);

  useDebounce<string>(value, 1000); // Debounce input value

  const handleChange = (e: string): void => {
    setValue(e);
  };

  // Load last selected address and history from localStorage
  const [history, setHistory] = React.useState<string[]>([]);

  React.useEffect(() => {
    const lastSelected: string | null = localStorage.getItem(
      'lastSelectedAddress',
    );

    console.log(lastSelected);

    if (lastSelected) {
      setValue(lastSelected);
      onSelectAddress(lastSelected);
    }
    const storedHistory: string[] = JSON.parse(
      localStorage.getItem('placesHistory') ?? '[]',
    );
    setHistory(storedHistory);
  }, [setValue, onSelectAddress]);

  const handleSelect = async (address: string): Promise<void> => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);
      console.log(lat, lng);

      onSelectAddress(address);
      // Save to localStorage as the last selected address
      localStorage.setItem('lastSelectedAddress', address);

      // Update the history and save the last 5 addresses
      const updatedHistory = [
        address,
        ...history.filter((a) => a !== address),
      ].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem('placesHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <>
      {isLoaded ? (
        <Popover>
          <PopoverTrigger asChild>
            <div className="w-1/3 sm:w-1/4 justify-start py-2 rounded-lg text-sm cursor-pointer flex flex-row items-center justify-between text-primary-dark">
              <div className="flex-1 ">
                {value || (
                  <div className="text-zinc-500">Search your location</div>
                )}
              </div>
              {value !== '' && (
                <Icons.close
                  className="hover:bg-primary p-1 rounded-lg w-6 h-6"
                  onClick={() => {
                    setValue('');
                    onSelectAddress('');
                  }}
                />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-60 p-2">
            <Command>
              <CommandInput
                value={value}
                onValueChange={(e) => {
                  handleChange(e);
                }}
                placeholder="Search location..."
                className="h-9"
              />

              <CommandGroup>
                {status === 'OK' &&
                  data.map(({ place_id: placeId, description }) => (
                    <CommandItem
                      key={placeId}
                      className="aria-selected:bg-accent/50"
                      onSelect={() => {
                        handleSelect(description).catch(console.error);
                      }}
                    >
                      {description}
                    </CommandItem>
                  ))}
                {status !== 'OK' && history.length === 0 && (
                  <CommandItem className="aria-selected:bg-accent/50">
                    No results
                  </CommandItem>
                )}
                {history.map((address) => (
                  <CommandItem
                    key={address}
                    className="aria-selected:bg-accent/50"
                    onSelect={() => {
                      handleSelect(address).catch(console.error);
                    }}
                  >
                    {address}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="text-sm font-medium text-primary">
          Loading locations
        </div>
      )}
    </>
  );
};

export default PlacesAutocomplete;
