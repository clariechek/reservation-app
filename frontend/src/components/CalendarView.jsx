import React from 'react';

const CalendarView = ({ reservations, currentWeek, onSelectClass }) => {
  // Time slots from 6:00 AM to 6:00 PM
  const timeSlots = Array.from({ length: 25 }, (_, i) => {
    const hour = Math.floor(i / 2) + 6;
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${String(hour).padStart(2, '0')}:${minutes}`;
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getWeekDates = () => {
    const today = new Date();
    const monday = new Date(today);
    const dayOfWeek = monday.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust to get Monday
    monday.setDate(monday.getDate() + diff + (currentWeek * 7));

    return days.map((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return {
        day,
        date: date.getDate(),
        month: date.toLocaleString('default', { month: 'short' })
      };
    });
  };

  const weekDates = getWeekDates();

  const getClassesForTimeAndDay = (time, dayIndex) => {
    return reservations.filter(res => {
      const resDate = new Date(res.date);
      const targetDate = new Date(weekDates[dayIndex].date);
      return res.time === time && 
             resDate.getDate() === targetDate.getDate() &&
             resDate.getMonth() === targetDate.getMonth();
    });
  };

  return (
    <div className="calendar-view">
      {/* Calendar Header */}
      <div className="calendar-header">
        <div className="calendar-header-cell empty-cell"></div>
        {weekDates.map(({ day, date, month }) => (
          <div key={day} className="calendar-header-cell">
            <div className="day-name">{day}</div>
            <div className="day-date">{`${date} ${month}`}</div>
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div className="calendar-body">
        {timeSlots.map((time) => (
          <div key={time} className="calendar-row">
            <div className="time-cell">{time}</div>
            {days.map((_, dayIndex) => (
              <div key={`${time}-${dayIndex}`} className="calendar-cell">
                {getClassesForTimeAndDay(time, dayIndex).map((res) => (
                  <div
                    key={res._id}
                    className={`class-block ${res.className.toLowerCase().replace(' ', '-')}`}
                    onClick={() => onSelectClass(res)}
                  >
                    {res.className}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView; 