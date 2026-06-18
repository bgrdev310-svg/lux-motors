import { useState, useEffect, useRef, useMemo } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import './DatePicker.css';

export default function DatePicker({
  id,
  value,
  onChange,
  minDate = '',
  maxDate = '',
  bookedDates = [],
  placeholder = 'Select Date'
}) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Keep track of which month/year the calendar grid is currently showing
  const [currentDate, setCurrentDate] = useState(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) return d;
    }
    if (minDate) {
      const d = new Date(minDate);
      if (!isNaN(d.getTime())) return d;
    }
    return new Date();
  });

  const containerRef = useRef(null);

  // Sync displayed month if value changes externally (and dropdown is closed)
  useEffect(() => {
    if (value && !isOpen) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) {
        setCurrentDate(d);
      }
    }
  }, [value, isOpen]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const clickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, []);

  const monthYearStr = useMemo(() => {
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  }, [currentDate]);

  const todayStr = useMemo(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const d = String(today.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, []);

  // Format the date value for display in the trigger input (e.g. "Jun 18, 2026")
  const displayValue = useMemo(() => {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d.getTime())) return value;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, [value]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Navigation handlers
  const handlePrevMonth = (e) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Generate the day elements
  const daysInMonth = useMemo(() => {
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday, 6 is Saturday
    
    const daysArr = [];
    
    // Fill leading empty cells
    for (let i = 0; i < firstDayIndex; i++) {
      daysArr.push({ type: 'empty', id: `empty-${i}` });
    }
    
    // Fill month days
    for (let day = 1; day <= totalDays; day++) {
      const mStr = String(month + 1).padStart(2, '0');
      const dStr = String(day).padStart(2, '0');
      const dateStr = `${year}-${mStr}-${dStr}`;
      
      const isBooked = bookedDates.includes(dateStr);
      const isPastMin = minDate && dateStr < minDate;
      const isPostMax = maxDate && dateStr > maxDate;
      const isDisabled = isPastMin || isPostMax;
      
      daysArr.push({
        type: 'day',
        day,
        dateStr,
        isToday: dateStr === todayStr,
        isSelected: dateStr === value,
        isBooked,
        isDisabled: isDisabled || isBooked,
        id: `day-${dateStr}`
      });
    }
    
    return daysArr;
  }, [year, month, minDate, maxDate, bookedDates, todayStr, value]);

  const handleSelectDay = (dayObj) => {
    if (dayObj.isDisabled) return;
    onChange(dayObj.dateStr);
    setIsOpen(false);
  };

  const handleTodayClick = (e) => {
    e.stopPropagation();
    // Verify today is not booked or disabled
    const isTodayBooked = bookedDates.includes(todayStr);
    const isTodayPastMin = minDate && todayStr < minDate;
    const isTodayPostMax = maxDate && todayStr > maxDate;
    
    if (!isTodayBooked && !isTodayPastMin && !isTodayPostMax) {
      onChange(todayStr);
    } else {
      // Just navigate calendar view to current month
      setCurrentDate(new Date());
    }
    setIsOpen(false);
  };

  const handleClearClick = (e) => {
    e.stopPropagation();
    onChange('');
    setIsOpen(false);
  };

  return (
    <div className="custom-datepicker-container" ref={containerRef}>
      {/* Clickable field trigger */}
      <button
        type="button"
        id={id}
        className="custom-datepicker-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="grid"
        aria-expanded={isOpen}
      >
        <span className={`datepicker-trigger-value ${!displayValue ? 'is-placeholder' : ''}`}>
          {displayValue || placeholder}
        </span>
        <CalendarIcon className="datepicker-trigger-icon" size={16} />
      </button>

      {/* Calendar Dropdown Overlay */}
      {isOpen && (
        <div className="custom-datepicker-dropdown">
          {/* Header Month controls */}
          <div className="calendar-header">
            <button
              type="button"
              className="calendar-nav-btn"
              onClick={handlePrevMonth}
              title="Previous Month"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="calendar-month-year">{monthYearStr}</span>
            <button
              type="button"
              className="calendar-nav-btn"
              onClick={handleNextMonth}
              title="Next Month"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Weekday columns */}
          <div className="calendar-weekdays">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <span key={d} className="calendar-weekday">
                {d}
              </span>
            ))}
          </div>

          {/* Grid of days */}
          <div className="calendar-days" role="grid">
            {daysInMonth.map((dayObj) => {
              if (dayObj.type === 'empty') {
                return <div key={dayObj.id} className="calendar-day-wrapper empty-cell" />;
              }

              let dayClass = 'calendar-day';
              if (dayObj.isSelected) dayClass += ' calendar-day--selected';
              if (dayObj.isToday) dayClass += ' calendar-day--today';
              if (dayObj.isBooked) dayClass += ' calendar-day--booked';
              else if (dayObj.isDisabled) dayClass += ' calendar-day--disabled';

              return (
                <div key={dayObj.id} className="calendar-day-wrapper" role="gridcell">
                  <button
                    type="button"
                    className={dayClass}
                    onClick={() => handleSelectDay(dayObj)}
                    disabled={dayObj.isDisabled}
                    title={
                      dayObj.isBooked 
                        ? 'Car is booked on this date' 
                        : dayObj.isDisabled 
                        ? 'Date unavailable' 
                        : dayObj.dateStr
                    }
                  >
                    {dayObj.day}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="calendar-footer">
            <button
              type="button"
              className="calendar-clear-btn"
              onClick={handleClearClick}
            >
              Clear
            </button>
            <button
              type="button"
              className="calendar-today-btn"
              onClick={handleTodayClick}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
