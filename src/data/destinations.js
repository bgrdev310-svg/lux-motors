import palmJumeirahImg from '../assets/images/loc-palm-jumeirah.webp';
import abuDhabiImg from '../assets/images/loc-abu-dhabi.webp';
import sharjahImg from '../assets/images/loc-sharjah.webp';
import ummAlQuwainImg from '../assets/images/loc-umm-al-quwain.webp';

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

export const detailedDestinations = [
  // Column 1
  { name: 'Palm Jumeirah', category: 'communities', type: 'Island / Area', zone: 'Dubai Coast', popular: true },
  { name: 'Jumeirah Beach Residence (JBR)', category: 'communities', type: 'Area / Coast', zone: 'Dubai Marina & JBR', popular: true },
  { name: 'Dubai Marina', category: 'communities', type: 'Area / Coast', zone: 'Dubai Marina & JBR', popular: true },
  { name: 'Business Bay', category: 'communities', type: 'Business Hub', zone: 'Downtown & Business Bay', popular: false },
  { name: 'Downtown Dubai', category: 'communities', type: 'City Center', zone: 'Downtown & Business Bay', popular: true },
  { name: 'Dubai International Airport (DXB)', category: 'airports', type: 'Airport Terminal', zone: 'Airports', popular: true },
  { name: 'Dubai Hills Estate', category: 'communities', type: 'Residential Community', zone: 'Inland Communities', popular: false },

  // Column 2
  { name: 'Al Barsha', category: 'communities', type: 'Residential Area', zone: 'Inland Communities', popular: false },
  { name: 'Atlantis The Royal', category: 'hotels', type: 'Luxury Resort', zone: 'Resorts & Hotels', popular: true },
  { name: 'Bulgari Resort Dubai', category: 'hotels', type: 'Luxury Resort', zone: 'Resorts & Hotels', popular: true },
  { name: 'Bluewaters Island', category: 'communities', type: 'Island / Area', zone: 'Dubai Coast', popular: true },
  { name: 'City Walk', category: 'communities', type: 'Lifestyle Area', zone: 'Downtown & Business Bay', popular: false },
  { name: 'Five Palm Jumeirah', category: 'hotels', type: 'Luxury Hotel', zone: 'Resorts & Hotels', popular: true },
  { name: 'W Dubai - The Palm', category: 'hotels', type: 'Luxury Resort', zone: 'Resorts & Hotels', popular: false },

  // Column 3
  { name: 'Burj Khalifa', category: 'hotels', type: 'Iconic Landmark', zone: 'Downtown & Business Bay', popular: true },
  { name: 'Armani Hotel (Downtown)', category: 'hotels', type: 'Luxury Hotel', zone: 'Resorts & Hotels', popular: true },
  { name: 'Dubai International Financial Centre (DIFC)', category: 'communities', type: 'Business Hub', zone: 'Downtown & Business Bay', popular: true },
  { name: 'Four Seasons Resort Jumeirah', category: 'hotels', type: 'Luxury Resort', zone: 'Resorts & Hotels', popular: true },
  { name: 'Jumeirah Al Naseem', category: 'hotels', type: 'Luxury Resort', zone: 'Resorts & Hotels', popular: false },
  { name: 'Address Sky View', category: 'hotels', type: 'Luxury Hotel', zone: 'Resorts & Hotels', popular: true },
  { name: 'Jumeirah Bay Island', category: 'communities', type: 'Island / Area', zone: 'Dubai Coast', popular: false },

  // Column 4
  { name: 'Emirates Hills', category: 'communities', type: 'Residential Community', zone: 'Inland Communities', popular: false },
  { name: 'Jumeirah Golf Estates', category: 'communities', type: 'Residential Community', zone: 'Inland Communities', popular: false },
  { name: 'Al Barari', category: 'communities', type: 'Residential Community', zone: 'Inland Communities', popular: false },
  { name: 'District One', category: 'communities', type: 'Residential Community', zone: 'Inland Communities', popular: false },
  { name: 'The World Islands', category: 'communities', type: 'Island Group', zone: 'Dubai Coast', popular: false },
  { name: 'Jumeirah Islands', category: 'communities', type: 'Island Community', zone: 'Inland Communities', popular: false },
  { name: 'La Mer', category: 'communities', type: 'Lifestyle Area', zone: 'Dubai Coast', popular: false },

  // Column 5
  { name: 'Port De La Mer', category: 'communities', type: 'Lifestyle Area', zone: 'Dubai Coast', popular: false },
  { name: 'Arabian Ranches', category: 'communities', type: 'Residential Community', zone: 'Inland Communities', popular: false },
  { name: 'Pearl Jumeirah', category: 'communities', type: 'Island / Area', zone: 'Dubai Coast', popular: false },
  { name: 'Tilal Al Ghaf', category: 'communities', type: 'Residential Community', zone: 'Inland Communities', popular: false },
  { name: 'Wasl 1', category: 'communities', type: 'Lifestyle Area', zone: 'Downtown & Business Bay', popular: false },
  { name: 'Dubai Creek Harbour', category: 'communities', type: 'Lifestyle Area', zone: 'Dubai Coast', popular: false },
  { name: 'The Meadows', category: 'communities', type: 'Residential Community', zone: 'Inland Communities', popular: false },

  // Column 6
  { name: 'The Lakes', category: 'communities', type: 'Residential Community', zone: 'Inland Communities', popular: false },
  { name: 'The Springs', category: 'communities', type: 'Residential Community', zone: 'Inland Communities', popular: false },
  { name: 'Jumeirah Park', category: 'communities', type: 'Residential Community', zone: 'Inland Communities', popular: false },
  { name: 'Jumeirah Heights', category: 'communities', type: 'Residential Community', zone: 'Inland Communities', popular: false },
  { name: 'Dubai South (Villa Project)', category: 'communities', type: 'Residential Community', zone: 'Inland Communities', popular: false },
  { name: 'Al Sufouh', category: 'communities', type: 'Residential Area', zone: 'Dubai Coast', popular: false },
  { name: 'Al Wasl', category: 'communities', type: 'Residential Area', zone: 'Downtown & Business Bay', popular: false },
];

