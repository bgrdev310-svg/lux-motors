import heroCar from '../assets/images/hero-car.webp';
import studioUrus from '../assets/images/studio-urus.webp';
import studioFerrari from '../assets/images/studio-ferrari.webp';
import locPalm from '../assets/images/loc-palm-jumeirah.webp';
import locAbuDhabi from '../assets/images/loc-abu-dhabi.webp';
import carFerrari from '../assets/images/car-ferrari.webp';

export const BLOG_CATEGORIES = [
  { id: 'all', label: 'All Stories' },
  { id: 'guides', label: 'Dubai Guides' },
  { id: 'fleet', label: 'Fleet & Reviews' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'news', label: 'Company News' },
];

export const defaultBlogs = [
  {
    id: '1',
    slug: 'ultimate-supercar-guide-dubai',
    title: 'Ultimate Guide to Renting a Supercar in Dubai',
    excerpt:
      'Everything you need to know before booking your first exotic rental — documents, deposits, insurance, and the best routes across the Emirates.',
    coverImage: heroCar,
    category: 'guides',
    tags: ['Dubai', 'Supercar', 'Rental Tips'],
    author: { name: 'Lux Motors Editorial' },
    readTimeMinutes: 8,
    publishedAt: '2026-06-10',
    featured: true,
    content: `
## Why Dubai Is the World's Supercar Capital

Dubai's wide highways, iconic skyline, and culture of automotive excellence make it the ultimate destination for exotic car enthusiasts. Whether you're visiting for business or leisure, renting a supercar transforms your trip into an unforgettable experience.

## What You Need to Rent

For UAE residents, you'll need a valid Emirates ID, UAE driving license, and passport copy. International tourists require a valid passport, UAE tourist visa, home country license, and an International Driving Permit.

## Choosing the Right Vehicle

Consider your itinerary when selecting a car. A Lamborghini Urus is perfect for family trips and desert drives, while a Ferrari F8 Tributo delivers pure track-inspired thrills on Sheikh Zayed Road.

## Understanding Costs & Deposits

Rental charges are settled at handover via credit card, cash, or crypto. Security deposits are pre-authorized on your credit card and released within 21–30 days after return. Salik tolls are billed at 5 AED per gate crossing.

## Best Routes to Experience

1. **Sheikh Zayed Road** — Dubai's main artery with Burj Khalifa views
2. **Palm Jumeirah Crescent** — Coastal luxury at its finest
3. **Dubai to Abu Dhabi** — E11 highway through desert landscapes

> "At Lux Motors, we make every rental feel like a private concierge experience — from WhatsApp booking to doorstep delivery."

Ready to experience it yourself? Browse our fleet and book your dream car today.
    `.trim(),
  },
  {
    id: '2',
    slug: 'urus-vs-g63-comparison',
    title: 'Lamborghini Urus vs Mercedes G63 — Which SUV to Rent?',
    excerpt:
      'Two icons, one decision. We break down performance, presence, and practicality to help you choose the perfect luxury SUV for your Dubai adventure.',
    coverImage: studioUrus,
    category: 'fleet',
    tags: ['Lamborghini', 'Mercedes', 'SUV'],
    author: { name: 'Lux Motors Editorial' },
    readTimeMinutes: 6,
    publishedAt: '2026-06-05',
    featured: false,
    content: `
## The Battle of the Super SUVs

Both the Lamborghini Urus and Mercedes-AMG G63 represent the pinnacle of luxury SUV engineering. But which one suits your Dubai experience?

## Lamborghini Urus — Italian Exotic

The Urus delivers supercar DNA in an SUV body. With 650 HP and a 0–100 km/h sprint in 3.6 seconds, it's the choice for drivers who want head-turning Italian flair.

## Mercedes G63 AMG — German Precision

The G-Wagon is an icon of status and capability. Its boxy silhouette commands respect at every valet, and the AMG-tuned V8 delivers a thunderous soundtrack.

## Our Verdict

Choose the **Urus** for performance and modern luxury. Choose the **G63** for timeless status and off-road capability. Can't decide? Rent both — we offer multi-day packages.
    `.trim(),
  },
  {
    id: '3',
    slug: 'scenic-drives-dubai-abu-dhabi',
    title: 'Top 5 Scenic Drives from Dubai to Abu Dhabi',
    excerpt:
      'From coastal highways to desert vistas — our curated routes for the most breathtaking drives across the UAE in a luxury rental.',
    coverImage: locAbuDhabi,
    category: 'lifestyle',
    tags: ['Road Trip', 'Abu Dhabi', 'Scenic Routes'],
    author: { name: 'Lux Motors Editorial' },
    readTimeMinutes: 7,
    publishedAt: '2026-05-28',
    featured: false,
    content: `
## Drive the Emirates in Style

The UAE offers some of the world's most spectacular driving roads. Here are our top five routes, perfect for a convertible or grand tourer.

### 1. E11 Sheikh Zayed Road
The classic Dubai-to-Abu Dhabi corridor. Wide lanes, stunning architecture, and the Saadiyat Island exit for beach views.

### 2. Jebel Hafeet Mountain Road
A winding ascent with panoramic desert views. Best experienced in a Porsche 911 or Ferrari Roma.

### 3. Al Qudra Cycle Track Loop
Desert dunes and flamingo lakes — a hidden gem just 30 minutes from Dubai Marina.

### 4. Hatta Mountain Route
Wadis, dams, and cool mountain air. Ideal for a weekend escape in a Range Rover or Urus.

### 5. Palm Jumeirah to Burj Al Arab
The quintessential Dubai evening drive. Golden hour light on the Arabian Gulf — pure magic.
    `.trim(),
  },
  {
    id: '4',
    slug: 'tourist-documents-uae-rental',
    title: 'What Documents Do Tourists Need to Rent in the UAE?',
    excerpt:
      'A clear checklist for international visitors — licenses, permits, visas, and everything RTA requires for a smooth handover.',
    coverImage: carFerrari,
    category: 'guides',
    tags: ['Documents', 'Tourists', 'RTA'],
    author: { name: 'Lux Motors Editorial' },
    readTimeMinutes: 5,
    publishedAt: '2026-05-20',
    featured: false,
    content: `
## Renting as an International Visitor

Dubai welcomes millions of tourists each year, and renting a luxury car is easier than you might think — provided you have the right paperwork.

## Required Documents

- Valid passport copy
- UAE tourist visa stamp or entry permit
- Home country driving license (held for minimum 1 year)
- International Driving Permit (IDP) — mandatory for most nationalities

## Age Requirements

Drivers must be at least 19 years old for standard luxury models. High-performance supercars may require age 25. Specialized insurance is automatically attached for drivers aged 19–24.

## Pro Tips

Upload your documents via WhatsApp before arrival for instant pre-approval. Our team can have your car waiting at DXB airport arrivals.
    `.trim(),
  },
  {
    id: '5',
    slug: 'palm-jumeirah-evening-route',
    title: 'Palm Jumeirah to Burj Al Arab: The Perfect Evening Route',
    excerpt:
      'Golden hour on the Arabian Gulf — a step-by-step luxury drive itinerary with photo stops and dining recommendations.',
    coverImage: locPalm,
    category: 'lifestyle',
    tags: ['Palm Jumeirah', 'Evening Drive', 'Dubai'],
    author: { name: 'Lux Motors Editorial' },
    readTimeMinutes: 4,
    publishedAt: '2026-05-15',
    featured: false,
    content: `
## The Iconic Dubai Sunset Drive

There's no better way to experience Dubai's coastline than behind the wheel of a convertible as the sun dips below the horizon.

## The Route

Start at **Atlantis The Palm** and cruise the crescent road. Continue along Jumeirah Beach Road, passing Kite Beach and Sunset Beach. End at the **Burj Al Arab** for the classic photo moment.

## Best Time to Go

Depart at 5:30 PM during summer, or 6:00 PM in winter. You'll catch golden hour and the city lights coming alive.

## Recommended Vehicle

A Rolls-Royce Dawn or Ferrari Portofino — top down, V8 symphony, Arabian Gulf breeze.
    `.trim(),
  },
  {
    id: '6',
    slug: 'ferrari-sf90-fleet-arrival',
    title: 'New Arrival: Ferrari SF90 Stradale Joins Our Fleet',
    excerpt:
      '986 horsepower of plug-in hybrid excellence — the most advanced Ferrari ever built is now available for daily rental in Dubai.',
    coverImage: studioFerrari,
    category: 'news',
    tags: ['Ferrari', 'SF90', 'New Fleet'],
    author: { name: 'Lux Motors Editorial' },
    readTimeMinutes: 3,
    publishedAt: '2026-06-01',
    featured: false,
    content: `
## A New Benchmark in Our Collection

We're thrilled to announce the arrival of the **Ferrari SF90 Stradale** — Maranello's first plug-in hybrid supercar and the most powerful road car Ferrari has ever produced.

## Specifications

- **Engine:** 4.0L twin-turbo V8 + three electric motors
- **Power:** 986 HP combined
- **0–100 km/h:** 2.5 seconds
- **Top Speed:** 340 km/h

## Available Now

Book the SF90 Stradale for daily, weekly, or weekend packages. Doorstep delivery across Dubai, Abu Dhabi, and Sharjah included.
    `.trim(),
  },
];

export function getBlogBySlug(slug) {
  return defaultBlogs.find((b) => b.slug === slug) ?? null;
}

export function getCategoryLabel(categoryId) {
  return BLOG_CATEGORIES.find((c) => c.id === categoryId)?.label ?? categoryId;
}
