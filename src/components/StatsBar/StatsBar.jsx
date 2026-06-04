import './StatsBar.css';
import { useCountUp } from '../../hooks/useCountUp';
import { Car, Clock, MapPin, Users } from 'lucide-react';

function StatItem({ icon: Icon, end, suffix = '', label }) {
  const { count, ref } = useCountUp(end, 2000);
  return (
    <div className="stat-item" ref={ref}>
      <div className="stat-item__icon">
        <Icon size={22} />
      </div>
      <div className="stat-item__content">
        <span className="stat-item__number">{count}{suffix}</span>
        <span className="stat-item__label">{label}</span>
      </div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <div className="stats-bar glass">
      <div className="stats-bar__inner container">
        <StatItem icon={Car} end={500} suffix="+" label="Luxury Cars" />
        <div className="stats-bar__divider" />
        <StatItem icon={Clock} end={24} suffix="/7" label="Support" />
        <div className="stats-bar__divider" />
        <StatItem icon={MapPin} end={35} suffix="+" label="Locations" />
        <div className="stats-bar__divider" />
        <StatItem icon={Users} end={10} suffix="K+" label="Happy Clients" />
      </div>
    </div>
  );
}
