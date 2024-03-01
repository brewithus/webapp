'use client';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import type { NextPage } from 'next';

/**
 * Represents the properties of the Page component.
 */
interface PageProps {
  /**
   * the search parameters passed to the page
   */
  searchParams: Record<string, string>;
}

/**
 * Search Params Page Component
 *
 * This component demonstrates how to use search parameters to filter or display content dynamically.
 * It expects `searchParams` as a prop, specifically looking for `tags` and `address` parameters to display.
 * If `tags` are provided, they are displayed as badges; if not, a default message is shown. The `address`
 * is shown directly, with a fallback message if not provided.
 * @param {PageProps} searchParams the search parameters passed to the page
 * @returns {JSX.Element} The JSX for the business search page or a redirection effect.
 */
const Page: NextPage<PageProps> = ({
  searchParams,
}: PageProps): JSX.Element => {
  // Check if 'tags' param exists and is not just whitespace
  const tagsExistAndNotEmpty = searchParams.tags?.trim();

  // If 'tags' param exists, split into array, else default to empty array
  const tags = tagsExistAndNotEmpty
    ? searchParams.tags
        .trim()
        .split(',')
        .filter((tag) => tag !== '')
    : [];

  return (
    <div>
      <div className="flex flex-row gap-2">
        <span>Address:</span>
        <span className="font-bold">
          {searchParams.address || 'Address not provided'}
        </span>
      </div>
      <div className="flex flex-row gap-2">
        Tags:
        <span className="font-bold flex flex-row gap-2">
          {tags.length === 0
            ? 'No tags selected'
            : tags.map((tag, index) => <Badge key={index}>{tag}</Badge>)}
        </span>
      </div>
    </div>
  );
};

export default Page;
