import heroCarImg from '../assets/images/hero-car.webp';
import ferrariImg from '../assets/images/car-ferrari.webp';
import rollsRoyceImg from '../assets/images/car-rollsroyce.webp';
import porscheImg from '../assets/images/car-porsche.webp';
import lamborghiniImg from '../assets/images/car-lamborghini.webp';

export const heroCar = {
  name: 'Lamborghini Urus',
  tagline: 'The World\'s First Super SUV',
  image: heroCarImg,
  price: 3500,
  currency: 'AED',
  period: 'day',
  specs: { acceleration: '3.6s', power: '666 HP', topSpeed: '305 km/h', engine: 'V8 Twin-Turbo' },
};

export const featuredCars = [
  { id: 1, name: 'Lamborghini Aventador', category: 'SuperSport', brand: 'Lamborghini', image: lamborghiniImg, price: 5000, currency: 'AED', period: 'day', specs: { power: '770 HP', acceleration: '2.8s', engine: 'V12' }, slug: 'lamborghini-aventador' },
  { id: 2, name: 'Ferrari 488 GTB', category: 'Sport', brand: 'Ferrari', image: ferrariImg, price: 4000, currency: 'AED', period: 'day', specs: { power: '670 HP', acceleration: '3.0s', engine: 'V8' }, slug: 'ferrari-488-gtb' },
  { id: 3, name: 'Rolls-Royce Ghost', category: 'Luxury', brand: 'Rolls-Royce', image: rollsRoyceImg, price: 4500, currency: 'AED', period: 'day', specs: { power: '571 HP', acceleration: '4.8s', engine: 'V12' }, slug: 'rolls-royce-ghost' },
  { id: 4, name: 'Porsche 911 GT3', category: 'Sport', brand: 'Porsche', image: porscheImg, price: 3000, currency: 'AED', period: 'day', specs: { power: '502 HP', acceleration: '3.4s', engine: 'Flat-6' }, slug: 'porsche-911-gt3' },
];
