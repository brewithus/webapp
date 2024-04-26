'use client';

import React, { useState } from 'react';
import MultiSelectCombobox from './TagsSelection';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import GoogleSearchAutocomplete from './autocomplete';

const FindCoffeeSpot: React.FC<{ className?: string }> = ({
  className,
}): JSX.Element => {
  const router = useRouter();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // state to store the selected address details
  const [selectedAddress, setSelectedAddress] = useState<string>('');

  // Define the handleSelectAddress function
  const handleSelectAddress = (address: string): void => {
    // Update the state with the new address and its lat/lng
    setSelectedAddress(address);
    localStorage.setItem('lastSelectedAddress', address);
  };

  const handleFindCoffeeSpotsClick = (): void => {
    if (!selectedAddress) {
      // Alert the user to select a location first
      alert('Please select a location first.');
      return;
    }

    // Construct the query params string
    const queryParams = new URLSearchParams({
      address: selectedAddress,
      tags: selectedTags.join(','),
    }).toString();

    // Redirect to the /search page with query params
    router.push(`/search?${queryParams}`);
  };

  React.useEffect(() => {
    const lastSelected: string | null = localStorage.getItem(
      'lastSelectedAddress',
    );

    if (lastSelected) {
      setSelectedAddress(lastSelected);
    }
  }, []);

  return (
    <div className={cn('w-full flex flex-col items-center gap-4', className)}>
      <div className="flex flex-row gap-3 items-center bg-white/80 rounded-lg px-4 w-full h-fit">
        <div className="flex-1 w-max">
          <MultiSelectCombobox
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          />
        </div>
        <Separator orientation="vertical" className="h-3/4" />
        {/* <PlacesAutocomplete onSelectAddress={handleSelectAddress} /> */}
        <GoogleSearchAutocomplete
          onSelectAddress={handleSelectAddress}
          defaultAddress={selectedAddress}
        />
      </div>
      <Button className="font-bold" onClick={handleFindCoffeeSpotsClick}>
        Find Coffee Spots
      </Button>
    </div>
  );
};

export default FindCoffeeSpot;
