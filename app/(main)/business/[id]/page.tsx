import type { NextPage } from 'next';
import React from 'react';
import ProductList from '../components/productList'
import coffeeShopsData from '../mock_data/cofeeShopData.json'
import GoogleMaps from '../components/Googlemap';
import ReviewSection from '../components/ReviewSection';
interface PageProps {
  /**
   * The parameters passed to the page, including the id of the store.
   */
  params: {
    id: string;
  };
}
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
}

// Define the Review interface
interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

interface CoffeeShopExtended {
  id: string;
  name: string;
  picture: string;
  address: string;
  tags: string[];
  menuItems: MenuItem[];
  reviews: Review[];
  rating?: number; // Additional properties from coffeeShopData
  reviewCount?: number;
  categories?: string[];
  status?: string;
  hours: string;
}

const findCoffeeShop = (id: string): CoffeeShopExtended | undefined => {
  return coffeeShopsData.find((shop) => shop.id === id);
};

const Page: NextPage<PageProps> = ({ params }: PageProps): JSX.Element => {
  const coffeeShop = findCoffeeShop(params.id);

  if (!coffeeShop) {
    return <div>Coffee shop not found</div>;
  }

  // Directly use coffeeShop.menuItems and coffeeShop.reviews
  const menuItems = coffeeShop.menuItems;
  const coffeeShopReviews = coffeeShop.reviews;
  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        {/* Coffee Shop Image */}
        <img
          src={coffeeShop.picture}
          alt={coffeeShop.name}
          style={{ 
            maxWidth: '100%',  
            maxHeight: '55vh', // Limits the height to 33vh, 1/3 of the viewport height
            objectFit: 'contain', // Ensures the image is fully visible
            width: 'auto',  // Allows the image to scale its width based on its natural aspect ratio
            display: 'block', // Removes any inline spacing
            margin: '0 auto' // Centers the image if it doesn't take up the full width
          }}
        />

        {/* Overlay Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 className="text-2xl font-bold" style={{ fontSize: '36px' }}>{coffeeShop.name}</h1>
          {/* Rating and Review Section */}
          <div style={{ fontSize: '24px' }}>
            <span>{'⭐'.repeat(Math.floor(coffeeShop.rating ?? 0))}</span>
            <span>{` (${coffeeShop.reviewCount} reviews)`}</span>
          </div>
          {/* Categories */}
          <div style={{ fontSize: '20px' }}>
            {coffeeShop.tags.map((tag, index) => (
              <span key={index} className="badge" style={{ marginRight: '10px', display: 'inline-block' }}>{tag}</span>
            ))}
          </div>
          {/* Status and Hours */}
          <div style={{ fontSize: '18px' }}>
            <span>{coffeeShop.status}</span>
            <span> - {coffeeShop.hours}</span>
          </div>
          {/* Action Buttons */}
          
        </div>
      </div>
      <ProductList coffeeShopId = {params.id}/>
      <GoogleMaps
        id = {params.id}
        address={coffeeShop.address}
        hours={coffeeShop.hours}
        phone="+1 234 567 8900"
      />
      {/* Review Section */}
      {coffeeShop.reviews && coffeeShop.reviews.length > 0 ? (
        <ReviewSection reviews={coffeeShop.reviews} />
      ) : (
      <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Page;
