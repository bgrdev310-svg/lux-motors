import './GlassCard.css';

export default function GlassCard({ children, className = '', hover = true, padding = true, ...props }) {
  return (
    <div
      className={`glass-card ${hover ? 'glass-card--hover' : ''} ${padding ? 'glass-card--padded' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
