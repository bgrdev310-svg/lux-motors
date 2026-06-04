import palmJumeirahImg from '../assets/images/loc-palm-jumeirah.png';
import abuDhabiImg from '../assets/images/loc-abu-dhabi.png';
import sharjahImg from '../assets/images/loc-sharjah.png';
import ummAlQuwainImg from '../assets/images/loc-umm-al-quwain.png';

export const destinations = [
  {
    id: 1,
    name: 'Palm Jumeirah',
    description: 'Iconic island living',
    carsAvailable: 85,
    slug: 'palm-jumeirah',
    emirate: 'Dubai',
    image: palmJumeirahImg,
  },
  {
    id: 2,
    name: 'Downtown Dubai',
    description: 'Heart of the city',
    carsAvailable: 120,
    slug: 'downtown-dubai',
    emirate: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Dubai Marina',
    description: 'Waterfront luxury',
    carsAvailable: 95,
    slug: 'dubai-marina',
    emirate: 'Dubai',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Abu Dhabi',
    description: 'Grand mosque & capital luxury',
    carsAvailable: 70,
    slug: 'abu-dhabi',
    emirate: 'Abu Dhabi',
    image: abuDhabiImg,
  },
  {
    id: 5,
    name: 'Sharjah',
    description: 'Cultural capital of the UAE',
    carsAvailable: 60,
    slug: 'sharjah',
    emirate: 'Sharjah',
    image: sharjahImg,
  },
  {
    id: 6,
    name: 'Umm Al Quwain',
    description: 'Coastal serenity & heritage',
    carsAvailable: 45,
    slug: 'umm-al-quwain',
    emirate: 'Umm Al Quwain',
    image: ummAlQuwainImg,
  },
];
