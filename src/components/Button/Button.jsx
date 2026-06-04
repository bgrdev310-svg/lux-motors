import './Button.css';
import { ArrowRight } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = false,
  href,
  onClick,
  className = '',
  ...props
}) {
  const classes = `btn btn--${variant} btn--${size} ${icon ? 'btn--icon' : ''} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        <span className="btn__text">{children}</span>
        {icon && <span className="btn__icon"><ArrowRight size={18} /></span>}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      <span className="btn__text">{children}</span>
      {icon && <span className="btn__icon"><ArrowRight size={18} /></span>}
    </button>
  );
}
