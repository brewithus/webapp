'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import {
  Command,
  CommandItem,
  CommandGroup,
  CommandInput,
} from '../ui/command';
import { CheckSquare2, Square } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Icons } from '../icons';

const tagsSelection = [
  'free-wifi',
  'spacious',
  'cozy',
  'lattes',
  'breakfast',
  'brunch',
  'lunch',
];

interface MultiSelectComboboxProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const MultiSelectCombobox: React.FC<MultiSelectComboboxProps> = ({
  selectedTags,
  onTagsChange,
}) => {
  // State and hooks setup
  const triggerRef = useRef<HTMLDivElement>(null);
  const [popoverWidth, setPopoverWidth] = useState<number | string>('auto');

  useEffect(() => {
    const triggerElement = triggerRef.current;

    if (triggerElement) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          // Use contentRect for width before border, padding, or scrollbar
          setPopoverWidth(entry.contentRect.width);
        }
      });

      // Start observing for resize
      resizeObserver.observe(triggerElement);

      // Clean up observer on component unmount
      return () => {
        resizeObserver.unobserve(triggerElement);
      };
    }
  }, []);

  const [query, setQuery] = useState('');

  const filteredTags = query
    ? tagsSelection.filter((tag) =>
        tag.toLowerCase().includes(query.toLowerCase()),
      )
    : tagsSelection;

  const toggleTag = (tag: string): void => {
    onTagsChange(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag],
    );
  };

  const removeTag = (tag: string): void => {
    onTagsChange(selectedTags.filter((t) => t !== tag));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          ref={triggerRef}
          className="justify-start py-2 rounded-lg truncate text-sm cursor-pointer flex flex-wrap gap-2"
        >
          {selectedTags.length > 0 ? (
            selectedTags.map((tag) => (
              <Badge
                key={tag}
                className="flex items-center gap-1 bg-primary-light/80 hover:bg-primary-light/60 focus:bg-primary-light/50 text-secondary-foreground text-sm"
              >
                {tag}
                <Icons.close
                  size="12"
                  className="cursor-pointer"
                  onClick={() => {
                    removeTag(tag);
                  }}
                />
              </Badge>
            ))
          ) : (
            <p className="text-zinc-500">
              Select your coffee spot preferences...
            </p>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        style={{ width: popoverWidth, minWidth: '240px' }}
        className="p-2"
      >
        <Command>
          <CommandInput
            value={query}
            onValueChange={(e) => {
              setQuery(e);
            }}
            placeholder="Search tags..."
          />
          <CommandGroup>
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => (
                <CommandItem
                  key={tag}
                  className="flex aria-selected:bg-accent/50 items-center gap-2"
                  onSelect={() => {
                    toggleTag(tag);
                  }}
                >
                  {selectedTags.includes(tag) ? (
                    <CheckSquare2 className={`ml-2`} />
                  ) : (
                    <Square className={`ml-2`} />
                  )}
                  {tag}
                </CommandItem>
              ))
            ) : (
              <CommandItem className="aria-selected:bg-accent/50">
                No tags found
              </CommandItem>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default MultiSelectCombobox;
