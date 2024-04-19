import { Business } from '../_types';

export const mockBusiness: Business[] = [
  {
    id: 'the-daily-grind',
    name: 'The Daily Grind',
    picture:
      'https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg',
    address: '123 Main St, Anytown, CA',
    location: { latitude: 34.05853826606606, longitude: -117.82480359836826 },
    tags: ['Cozy', 'WiFi', 'Coffee', 'Tea', 'Pastries'],
    menuItems: [
      {
        id: '1',
        name: 'Latte',
        description: 'Rich espresso blended with steamed milk',
        price: '$3.50',
      },
      {
        id: '2',
        name: 'Cappuccino',
        description: 'Espresso with frothy milk',
        price: '$3.00',
      },
      {
        id: '3',
        name: 'Espresso',
        description: 'Strong and bold espresso, made with freshly ground beans',
        price: '$2.50',
      },
      {
        id: '4',
        name: 'Americano',
        description: 'Espresso with hot water for a smooth and rich coffee',
        price: '$2.75',
      },
      {
        id: '5',
        name: 'Mocha',
        description:
          'Espresso with steamed milk and chocolate syrup, topped with whipped cream',
        price: '$3.75',
      },
      {
        id: '6',
        name: 'Macchiato',
        description: 'Espresso marked with a dollop of foamed milk',
        price: '$3.25',
      },
      {
        id: '7',
        name: 'Flat White',
        description:
          'Rich, full-flavored coffee with steamed milk and a thin layer of foam',
        price: '$3.50',
      },
      {
        id: '8',
        name: 'Iced Coffee',
        description:
          'Chilled, brewed coffee served over ice with optional milk and sweetener',
        price: '$2.95',
      },
    ],
    reviews: [
      {
        id: '1',
        user: {
          id: 'user1',
          name: 'Jane Doe',
          image_url: '',
        },
        rating: 5,
        text: 'Great atmosphere and coffee. A perfect place to work or meet with friends.',
        time_created: '2023-04-03T12:00:00Z',
      },
      {
        id: '2',
        user: {
          id: 'user2',
          name: 'John Smith',
          image_url: '',
        },
        rating: 4,
        text: 'Love the pastries here, especially the croissants!',
        time_created: '2023-04-03T12:00:00Z',
      },
      {
        id: '3',
        user: {
          id: 'user3',
          name: 'Lukaku',
          image_url: '',
        },
        rating: 1,
        text: 'Terrible service!',
        time_created: '2023-04-03T12:00:00Z',
      },
      {
        id: '4',
        user: {
          id: 'user4',
          name: 'Jess Lingrad',
          image_url: '',
        },
        rating: 5,
        text: 'Love this coffee shop!',
        time_created: '2023-04-03T12:00:00Z',
      },
    ],
    rating: 3.9,
    reviewCount: 2542,
    categories: ['Coffee & Tea', 'Ice Cream & Frozen Yogurt', 'Acai Bowls'],
    status: 'Open',
    hours: '7:00 AM - 10:00 PM',
  },

  {
    id: 'bean-there-done-that',
    name: 'Bean There, Done That',
    picture:
      'https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg',
    address: '456 Elm St, Anytown, CA',
    location: { latitude: 34.05784011190502, longitude: -117.82135278873565 },
    tags: ['Modern', 'Coffee', 'Cold Brew', 'Sandwiches'],
    menuItems: [
      {
        id: '1',
        name: 'Signature Cold Brew',
        description: 'Smooth, cold-steeped coffee served over ice',
        price: '$3.75',
      },
      {
        id: '2',
        name: 'Avocado Toast',
        description:
          'Freshly mashed avocado on toasted artisan bread with a hint of lemon',
        price: '$6.50',
      },
      {
        id: '3',
        name: 'Turmeric Latte',
        description:
          'Golden milk spiced with turmeric and cinnamon, paired with espresso',
        price: '$4.25',
      },
      {
        id: '4',
        name: 'Banana Bread',
        description: 'Homemade banana bread with walnuts',
        price: '$2.75',
      },
    ],
    reviews: [
      {
        id: '1',
        user: {
          id: 'user5',
          name: 'Samantha Right',
          image_url: '',
        },
        rating: 4,
        text: 'Delicious cold brew, definitely a must-try!',
        time_created: '2023-04-05T15:00:00Z',
      },
      {
        id: '2',
        user: {
          id: 'user6',
          name: 'Tony Bean',
          image_url: '',
        },
        rating: 5,
        text: 'Modern spot with top-notch sandwiches. A lunchtime favorite.',
        time_created: '2023-04-06T16:00:00Z',
      },
      {
        id: '3',
        user: {
          id: 'user7',
          name: 'Sara Lee',
          image_url: '',
        },
        rating: 2,
        text: 'Trendy place, but the coffee is too bitter for my taste.',
        time_created: '2023-04-07T17:00:00Z',
      },
    ],
    rating: 4.2,
    reviewCount: 1023,
    categories: ['Coffee & Tea', 'Bakery', 'Breakfast & Brunch'],
    status: 'Open',
    hours: '6:00 AM - 8:00 PM',
  },
];
