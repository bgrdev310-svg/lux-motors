import HeroSection from './HeroSection';
import StatsBar from '../../components/StatsBar/StatsBar';
import FeaturedFleet from './FeaturedFleet';
import Destinations from './Destinations';
import HowItWorks from './HowItWorks';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import BrandMarquee from './BrandMarquee';
import FAQ from './FAQ';
import CTASection from './CTASection';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <BrandMarquee />
      <StatsBar />
      <FeaturedFleet />
      <HowItWorks />
      <Destinations />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <CTASection />
    </div>
  );
}
