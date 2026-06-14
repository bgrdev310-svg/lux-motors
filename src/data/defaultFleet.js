import lamborghiniImg from '../assets/images/car-lamborghini.webp';
import ferrariImg from '../assets/images/car-ferrari.webp';
import rollsRoyceImg from '../assets/images/car-rollsroyce.webp';
import porscheImg from '../assets/images/car-porsche.webp';
import urusImg from '../assets/images/hero-car.webp';
import studioLamborghiniImg from '../assets/images/studio-lamborghini.webp';
import studioFerrariImg from '../assets/images/studio-ferrari.webp';
import studioRollsRoyceImg from '../assets/images/studio-rollsroyce.webp';
import studioPorscheImg from '../assets/images/studio-porsche.webp';
import studioUrusImg from '../assets/images/studio-urus.webp';

export const FLEET_CATEGORIES = ['SuperSport', 'Sport', 'Luxury', 'SUV', 'Convertible', 'Electric'];

export function slugify(text = '') {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function createEmptyCar() {
  return {
    id: `car-${Date.now()}`,
    slug: '',
    name: '',
    tagline: '',
    brand: '',
    category: 'Sport',
    year: String(new Date().getFullYear()),
    gearbox: '',
    image: '',
    studioImage: '',
    images: [],
    price: 3500,
    currency: 'AED',
    period: 'day',
    themeColor: '#c9a84c',
    themeRgb: '201, 168, 76',
    availability: 'Available Today',
    description: '',
    deposit: 5000,
    visible: true,
    specs: {
      power: 500,
      powerUnit: 'HP',
      acceleration: 3.5,
      accelerationUnit: 's',
      topSpeed: 300,
      topSpeedUnit: 'km/h',
      engine: '',
    },
    detailSpecs: {
      power: '',
      acceleration: '',
      engine: '',
      gearbox: '',
      seats: '2 Seats',
      driveType: 'Rear-Wheel Drive',
      fuel: 'Super 98 Premium',
      topSpeed: '',
    },
    hotspots: [],
    requirements: {
      age: 25,
      residents: ['Emirates ID copy', 'Valid UAE Driving License', 'Passport copy'],
      tourists: ['Valid Passport', 'Tourist Visa Stamp', 'Home Country License', 'International Driving Permit (IDP)'],
    },
    faqs: [],
  };
}

/** Unified fleet record used by Fleet page, Car Details, and Admin */
export const DEFAULT_FLEET = [
  {
    id: 1,
    slug: 'lamborghini-aventador',
    name: 'Lamborghini Aventador SVJ',
    tagline: 'The Pinnacle of V12 Raw Performance',
    brand: 'LAMBORGHINI',
    category: 'SuperSport',
    year: '2023',
    gearbox: '7-Speed ISR Automatic',
    image: lamborghiniImg,
    studioImage: studioLamborghiniImg,
    images: [lamborghiniImg, studioLamborghiniImg],
    price: 5000,
    currency: 'AED',
    period: 'day',
    themeColor: '#c9a84c',
    themeRgb: '201, 168, 76',
    availability: 'Available Today',
    description: 'The Lamborghini Aventador SVJ is a masterpiece of extreme performance and aggressive design. Driven by a naturally aspirated 6.5L V12 engine producing a jaw-dropping 770 HP, it represents the absolute pinnacle of high-velocity automotive physics.',
    deposit: 10000,
    visible: true,
    specs: { power: 770, powerUnit: 'HP', acceleration: 2.8, accelerationUnit: 's', topSpeed: 350, topSpeedUnit: 'km/h', engine: '6.5L V12' },
    detailSpecs: { power: '770 HP', acceleration: '2.8s (0-100 km/h)', engine: '6.5L V12 NA', gearbox: '7-Speed ISR Auto', seats: '2 Seats', driveType: 'All-Wheel Drive', fuel: 'Super 98 Premium', topSpeed: '350 km/h' },
    hotspots: [
      { x: 30, y: 55, title: 'Naturally Aspirated V12', desc: '6.5-liter engine delivering 770 hp at 8,500 rpm with a spine-tingling exhaust note.' },
      { x: 65, y: 70, title: 'Carbon Ceramic Brakes', desc: '400mm front discs with 6-piston calipers, stopping from 100-0 km/h in just 30 meters.' },
      { x: 80, y: 40, title: 'ALA 2.0 Aerodynamics', desc: 'Active aero flaps on the front splitter and rear wing adjust in 500ms for optimal downforce.' },
    ],
    requirements: { age: 25, residents: ['Emirates ID copy', 'Valid UAE Driving License', 'Passport copy'], tourists: ['Valid Passport', 'Tourist Visa Stamp', 'Home Country License', 'International Driving Permit (IDP)'] },
    faqs: [
      { q: 'Is the ground clearance adjustable for speed bumps?', a: 'Yes, this vehicle is equipped with a front-axle nose lift system. With the press of a console button, the front end raises by 40mm to safely navigate speed bumps and driveway ramps.' },
      { q: 'Does this rental vehicle allow racetrack driving?', a: 'No. Racetrack driving, drifting, and off-road driving are strictly prohibited under the commercial insurance policy terms.' },
      { q: 'What fuel octane rating is required?', a: 'The Aventador SVJ V12 engine runs exclusively on high-octane Super 98 premium fuel.' },
    ],
  },
  {
    id: 2,
    slug: 'ferrari-488-gtb',
    name: 'Ferrari 488 GTB',
    tagline: 'Exquisite Balance of Power and Control',
    brand: 'FERRARI',
    category: 'Sport',
    year: '2022',
    gearbox: '7-Speed F1 Dual-Clutch',
    image: ferrariImg,
    studioImage: studioFerrariImg,
    images: [ferrariImg, studioFerrariImg],
    price: 4000,
    currency: 'AED',
    period: 'day',
    themeColor: '#ff2800',
    themeRgb: '239, 68, 68',
    availability: 'Available Today',
    description: 'Uncompromising performance meets pristine control in the Ferrari 488 GTB. Powered by a mid-rear mounted 3.9L Twin-Turbo V8 pushing 670 horsepower, it delivers razor-sharp acceleration with zero turbo lag.',
    deposit: 5000,
    visible: true,
    specs: { power: 670, powerUnit: 'HP', acceleration: 3.0, accelerationUnit: 's', topSpeed: 330, topSpeedUnit: 'km/h', engine: '3.9L Twin-Turbo V8' },
    detailSpecs: { power: '670 HP', acceleration: '3.0s (0-100 km/h)', engine: '3.9L Twin-Turbo V8', gearbox: '7-Speed F1 Dual-Clutch', seats: '2 Seats', driveType: 'Rear-Wheel Drive', fuel: 'Super 98 Premium', topSpeed: '330 km/h' },
    hotspots: [
      { x: 50, y: 35, title: 'Twin-Turbo V8', desc: 'Mid-rear mounted V8 delivering zero turbo lag and a rich, harmonic Ferrari sound.' },
      { x: 22, y: 62, title: 'Forged Rims', desc: 'Ultra-light forged wheels reducing unsprung mass for blistering cornering response.' },
      { x: 85, y: 55, title: 'Slip Angle Control', desc: 'Advanced active differential that calculates slip angle to maximize exit speed.' },
    ],
    requirements: { age: 25, residents: ['Emirates ID copy', 'Valid UAE Driving License', 'Passport copy'], tourists: ['Valid Passport', 'Tourist Visa Stamp', 'Home Country License', 'International Driving Permit (IDP)'] },
    faqs: [
      { q: 'Where is the engine located?', a: 'The 488 GTB is a mid-rear engine layout. The engine is visible through the rear glass canopy.' },
      { q: 'What does the Manettino controller do?', a: 'The steering wheel dial adjusts driving modes, controlling suspension damping, active differential, and exhaust bypass valves.' },
      { q: 'What is the daily mileage allowance?', a: 'A standard daily rental includes 250 kilometers. Surcharges of 15 AED per additional kilometer apply.' },
    ],
  },
  {
    id: 3,
    slug: 'rolls-royce-ghost',
    name: 'Rolls-Royce Ghost',
    tagline: 'The Pinnacle of Quiet Luxury and Serenity',
    brand: 'ROLLS-ROYCE',
    category: 'Luxury',
    year: '2023',
    gearbox: '8-Speed Automatic',
    image: rollsRoyceImg,
    studioImage: studioRollsRoyceImg,
    images: [rollsRoyceImg, studioRollsRoyceImg],
    price: 4500,
    currency: 'AED',
    period: 'day',
    themeColor: '#8a2be2',
    themeRgb: '139, 92, 246',
    availability: 'Next Available: Tomorrow',
    description: 'The Rolls-Royce Ghost is the ultimate statement of quiet luxury, effortless power, and serene comfort. Powered by a massive 6.75L Twin-Turbo V12 producing 571 HP, it glides forward with effortless weightlessness.',
    deposit: 8000,
    visible: true,
    specs: { power: 571, powerUnit: 'HP', acceleration: 4.8, accelerationUnit: 's', topSpeed: 250, topSpeedUnit: 'km/h', engine: '6.75L Twin-Turbo V12' },
    detailSpecs: { power: '571 HP', acceleration: '4.8s (0-100 km/h)', engine: '6.75L Twin-Turbo V12', gearbox: '8-Speed Automatic', seats: '5 Seats', driveType: 'All-Wheel Drive', fuel: 'Super 98 Premium', topSpeed: '250 km/h (Limited)' },
    hotspots: [
      { x: 20, y: 50, title: 'Pantheon Grille', desc: 'Subtly illuminated chrome structure flanked by advanced laser headlights with 600m range.' },
      { x: 45, y: 40, title: 'Planar Suspension', desc: 'Continuously variable dampers for a true magic carpet ride.' },
      { x: 75, y: 35, title: 'Starlight Headliner', desc: '1,500 individual fiber optic stars hand-woven into the black leather ceiling.' },
    ],
    requirements: { age: 25, residents: ['Emirates ID copy', 'Valid UAE Driving License', 'Passport copy'], tourists: ['Valid Passport', 'Tourist Visa Stamp', 'Home Country License', 'International Driving Permit (IDP)'] },
    faqs: [
      { q: 'Does this car come with a chauffeur service option?', a: 'Yes. We can arrange an executive RTA-licensed chauffeur for an additional fee.' },
      { q: 'How do the doors close?', a: 'The rear coach doors can be closed automatically from the passenger seats with Door Close buttons on the C-pillar.' },
      { q: 'Is there a valet parking pass included?', a: 'Yes, valet attendants at major Dubai hotels place the Ghost in front-row VIP priority lanes.' },
    ],
  },
  {
    id: 4,
    slug: 'porsche-911-gt3',
    name: 'Porsche 911 GT3',
    tagline: 'Born on the Track. Built for the Road.',
    brand: 'PORSCHE',
    category: 'Sport',
    year: '2023',
    gearbox: '7-Speed PDK Automatic',
    image: porscheImg,
    studioImage: studioPorscheImg,
    images: [porscheImg, studioPorscheImg],
    price: 3000,
    currency: 'AED',
    period: 'day',
    themeColor: '#00f2fe',
    themeRgb: '6, 182, 212',
    availability: 'Available Today',
    description: 'Developed in the fires of motorsport, the Porsche 911 GT3 is a pure driver\'s machine. Its naturally aspirated 4.0L Flat-6 Boxer engine revs to 9,000 RPM, delivering 502 HP straight to the rear wheels.',
    deposit: 5000,
    visible: true,
    specs: { power: 502, powerUnit: 'HP', acceleration: 3.4, accelerationUnit: 's', topSpeed: 318, topSpeedUnit: 'km/h', engine: '4.0L Flat-6 Boxer' },
    detailSpecs: { power: '502 HP', acceleration: '3.4s (0-100 km/h)', engine: '4.0L Flat-6 NA', gearbox: '7-Speed PDK Auto', seats: '2 Seats', driveType: 'Rear-Wheel Drive', fuel: 'Super 98 Premium', topSpeed: '318 km/h' },
    hotspots: [
      { x: 80, y: 30, title: 'Swan-Neck Rear Wing', desc: 'Suspended mount design generating 150% more downforce than the previous GT3 model.' },
      { x: 28, y: 50, title: 'Dual-Vent Hood', desc: 'Lightweight carbon-fiber hood venting hot air to maintain aerodynamic stability.' },
      { x: 68, y: 72, title: 'Rear-Wheel Steering', desc: 'Electromechanical steering that turns rear wheels up to 2 degrees for high-speed stability.' },
    ],
    requirements: { age: 25, residents: ['Emirates ID copy', 'Valid UAE Driving License', 'Passport copy'], tourists: ['Valid Passport', 'Tourist Visa Stamp', 'Home Country License', 'International Driving Permit (IDP)'] },
    faqs: [
      { q: 'Does this car have back seats?', a: 'No, the GT3 is track-focused. Rear seats are removed from the factory to save weight.' },
      { q: 'What is a PDK transmission?', a: 'PDK is a dual-clutch automatic gearbox with near-instantaneous shift times under 100 milliseconds.' },
      { q: 'Is there luggage space?', a: 'The front frunk holds 132 liters, easily fitting two soft carry-on travel bags.' },
    ],
  },
  {
    id: 5,
    slug: 'lamborghini-urus',
    name: 'Lamborghini Urus Performante',
    tagline: 'The Ultimate Super Sports SUV',
    brand: 'LAMBORGHINI',
    category: 'SUV',
    year: '2024',
    gearbox: '8-Speed Automatic',
    image: urusImg,
    studioImage: studioUrusImg,
    images: [urusImg, studioUrusImg],
    price: 3500,
    currency: 'AED',
    period: 'day',
    themeColor: '#10b981',
    themeRgb: '16, 185, 129',
    availability: 'Available Today',
    description: 'The Lamborghini Urus Performante rewrites the rules of the Super SUV. Its twin-turbocharged 4.0-liter V8 pumps out 666 horsepower, thrusting from 0 to 100 km/h in 3.6 seconds.',
    deposit: 5000,
    visible: true,
    specs: { power: 666, powerUnit: 'HP', acceleration: 3.6, accelerationUnit: 's', topSpeed: 305, topSpeedUnit: 'km/h', engine: '4.0L Twin-Turbo V8' },
    detailSpecs: { power: '666 HP', acceleration: '3.6s (0-100 km/h)', engine: '4.0L Twin-Turbo V8', gearbox: '8-Speed Automatic', seats: '5 Seats', driveType: 'All-Wheel Drive', fuel: 'Super 98 Premium', topSpeed: '305 km/h' },
    hotspots: [
      { x: 30, y: 48, title: 'Twin-Turbo V8 Power', desc: '666 horsepower and 850 Nm of torque, 0-100 km/h in 3.6s.' },
      { x: 70, y: 55, title: 'Carbon Aero Roof', desc: 'Performante exclusive lightweight visible carbon fiber roof.' },
      { x: 48, y: 72, title: 'Akrapovič Exhaust', desc: 'Titanium sport exhaust producing a deep, resonant growl in Corsa mode.' },
    ],
    requirements: { age: 25, residents: ['Emirates ID copy', 'Valid UAE Driving License', 'Passport copy'], tourists: ['Valid Passport', 'Tourist Visa Stamp', 'Home Country License', 'International Driving Permit (IDP)'] },
    faqs: [
      { q: 'Is this car suitable for off-road desert driving?', a: 'No. This is a Performante street model on low-profile sport tires. Off-road driving voids insurance.' },
      { q: 'How much luggage fits in the trunk?', a: 'The Urus offers 616-liter trunk capacity, accommodating 4 large suitcases.' },
      { q: 'What driving modes are available?', a: 'Strada, Sport, Corsa, and a special Rally mode for loose gravel roads.' },
    ],
  },
];

export function toCarDetailsShape(fleetCar) {
  if (!fleetCar) return null;
  return {
    slug: fleetCar.slug,
    name: fleetCar.name,
    brand: fleetCar.brand,
    category: fleetCar.category,
    basePrice: fleetCar.price,
    availability: fleetCar.availability,
    images: fleetCar.images?.length ? fleetCar.images : [fleetCar.image, fleetCar.studioImage].filter(Boolean),
    description: fleetCar.description,
    specs: fleetCar.detailSpecs,
    deposit: fleetCar.deposit,
    requirements: fleetCar.requirements,
    faqs: fleetCar.faqs || [],
  };
}

export function toCarCardShape(fleetCar) {
  return {
    id: fleetCar.id,
    name: fleetCar.name,
    category: fleetCar.category,
    brand: fleetCar.brand,
    image: fleetCar.image,
    price: fleetCar.price,
    currency: fleetCar.currency,
    period: fleetCar.period,
    year: fleetCar.year,
    gearbox: fleetCar.gearbox,
    specs: {
      power: `${fleetCar.specs.power} HP`,
      acceleration: `${fleetCar.specs.acceleration}s`,
      engine: fleetCar.specs.engine,
    },
    slug: fleetCar.slug,
  };
}
