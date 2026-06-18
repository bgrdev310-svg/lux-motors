import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import './AdminSelect.css';

export default function AdminSelect({ value, onChange, options = [], placeholder = 'Select...', className = '', style = {}, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectOption = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  // Normalize options to objects with value and label
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return opt;
    }
    return { value: opt, label: String(opt) };
  });

  const selectedOpt = normalizedOptions.find(o => o.value === value) || normalizedOptions.find(o => o.label === value);
  const displayLabel = selectedOpt ? selectedOpt.label : placeholder;

  return (
    <div className={`admin-select-container ${className} ${disabled ? 'disabled' : ''}`} style={style} ref={dropdownRef}>
      <button
        type="button"
        className={`admin-select-trigger ${isOpen ? 'admin-select-trigger--active' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="admin-select-trigger-text">{displayLabel}</span>
        <ChevronDown size={15} className={`admin-select-chevron ${isOpen ? 'admin-select-chevron--active' : ''}`} />
      </button>

      {isOpen && (
        <div className="admin-select-menu">
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                className={`admin-select-option ${isSelected ? 'admin-select-option--selected' : ''}`}
                onClick={() => selectOption(opt.value)}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={13} className="admin-select-check" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
