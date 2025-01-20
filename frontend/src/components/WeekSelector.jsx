import React from 'react';

const WeekSelector = ({ currentWeek, setCurrentWeek, maxWeeks = 4 }) => {
  return (
    <div className="week-selector">
      <button 
        className="week-nav-button"
        onClick={() => setCurrentWeek(prev => Math.max(0, prev - 1))}
        disabled={currentWeek === 0}
      >
        Previous Week
      </button>
      <span className="week-indicator">Week {currentWeek + 1}</span>
      <button 
        className="week-nav-button"
        onClick={() => setCurrentWeek(prev => Math.min(maxWeeks - 1, prev + 1))}
        disabled={currentWeek === maxWeeks - 1}
      >
        Next Week
      </button>
    </div>
  );
};

export default WeekSelector; 