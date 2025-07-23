import type { ContentSectionData, Amenity } from './types';

export const SCROLL_PAGES = 12;

// Source: https://lumalabs.ai/capture/f4d017cc-de2c-44fb-ab6d-8cb5096959a1
export const LUMA_MODEL_SOURCE = 'https://lumalabs.ai/capture/f4d017cc-de2c-44fb-ab6d-8cb5096959a1';

export const keyframes = [
  { position: [-2.5, 0.5, 1.6] },
  { position: [0.684, 1.416, 4.746] },
  { position: [4, 1, 3] },
  { position: [6, 1, -5] },
  { position: [-1, 0.8, -3.7] },
  { position: [-1, 1.2, -1] },
  { position: [-1, 1.4, 1] },
];

export const CONTENT_DATA: ContentSectionData[] = [
  {
    id: 'hero',
    type: 'hero',
    title: 'Escape to Tranquility',
    description:
      "Unwind in Makki Mala's serene hillside retreat, a perfect blend of modern comfort and natural beauty.",
  },
  {
    id: 'intro',
    type: 'intro',
    title: 'A Space Designed for Peace',
    description:
      "Nestled in the lush landscapes of Wayanad, Kerala, our home offers breathtaking views and a tranquil atmosphere. It's more than just a place to stay—it's an experience designed to rejuvenate your soul.",
    details: ['Hosted by Senthil', 'Entire villa', '4 guests · 2 bedrooms · 2 beds · 2 bathrooms'],
  },
  {
    id: 'living',
    type: 'feature',
    title: 'Comfortable Living Area',
    description:
      'Relax in our spacious living room, designed with cozy seating and large windows that frame the stunning valley views. The perfect spot to read a book, enjoy a cup of coffee, or simply be.',
    images: [
      'https://picsum.photos/seed/living1/800/600',
      'https://picsum.photos/seed/living2/800/600',
    ],
  },
  {
    id: 'bedrooms',
    type: 'gallery',
    title: 'Restful Bedrooms',
    description:
      "Two beautifully appointed bedrooms await, each offering a peaceful sanctuary for a good night's sleep. Wake up to the gentle sounds of nature and stunning vistas.",
    images: [
      'https://picsum.photos/seed/bed1/600/800',
      'https://picsum.photos/seed/bed2/600/800',
      'https://picsum.photos/seed/bed3/600/800',
    ],
  },
  {
    id: 'outdoors',
    type: 'feature',
    title: 'Your Private Vista',
    description:
      'Step out onto the expansive balcony to soak in the panoramic views of the Western Ghats. It’s the ideal place for morning yoga, evening conversations, or stargazing at night.',
    images: [
      'https://picsum.photos/seed/outdoor1/800/600',
      'https://picsum.photos/seed/outdoor2/800/600',
    ],
  },
  {
    id: 'amenities',
    type: 'amenities',
    title: 'What This Place Offers',
    description:
      "We've equipped our home with everything you need for a comfortable and memorable stay.",
  },
  {
    id: 'location',
    type: 'location',
    title: 'Discover Wayanad',
    description:
      "Located in a secluded spot in Makki Mala, you are surrounded by nature yet close to Wayanad's main attractions, including tea plantations, waterfalls, and historic sites.",
    details: ['Makki Mala, Wayanad, Kerala, India'],
  },
  {
    id: 'reviews',
    type: 'reviews',
    title: 'What Our Guests Say',
    description: 'We are proud to have hosted wonderful guests from around the world.',
  },
  {
    id: 'cta',
    type: 'cta',
    title: 'Your Retreat Awaits',
    description:
      'Ready to experience the magic of Makki Mala? Check availability and book your stay.',
  },
];

export const AMENITIES_LIST: Amenity[] = [
  { name: 'Fast Wi-Fi', icon: 'FaWifi' },
  { name: '4K Television', icon: 'LuTv' },
  { name: 'Professionally cleaned', icon: 'GiSparkles' },
  { name: 'Scenic Views', icon: 'BsFillPinMapFill' },
];

export const REVIEWS_LIST = [
  {
    name: 'Anika',
    rating: 5,
    text: 'Absolutely breathtaking! The views are even better than the pictures. The house was spotless and so peaceful. A perfect getaway.',
  },
  {
    name: 'Rohan',
    rating: 5,
    text: 'A hidden gem in Wayanad. Senthil was a fantastic host. We loved the modern design and the connection to nature. Highly recommend.',
  },
  {
    name: 'Priya',
    rating: 5,
    text: "This was the most relaxing vacation I've had in years. The house is an architectural marvel, and the location is surreal. Can't wait to come back.",
  },
];
