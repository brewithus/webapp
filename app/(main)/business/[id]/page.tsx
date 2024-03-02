import type { NextPage } from 'next';
import React from 'react';

/**
 * Represents the properties of the Page component.
 */
interface PageProps {
  /**
   * The parameters passed to the page, including the id of the store.
   */
  params: {
    id: string;
  };
}

/**
 * The Page component displays information about a business.
 *
 * This page will fetch the data from the backend and display the information.
 * This view is a detailed view for each coffee shop listing, providing users
 * with more information like reviews, opening hours, and a photo gallery.
 * @param {PageProps} props The properties passed to the component.
 * @returns {JSX.Element} The JSX code for rendering the page.
 */
const Page: NextPage<PageProps> = ({ params }: PageProps): JSX.Element => {
  return <h1>Business id: {params.id}</h1>;
};

export default Page;
