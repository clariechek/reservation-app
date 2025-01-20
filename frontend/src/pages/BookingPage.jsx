import React, { useState } from 'react';
import ClassList from '../components/ClassList';
import WeekSelector from '../components/WeekSelector';

const BookingPage = ({ classes, fetchReservations }) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  return (
    <div className="booking-page">
      <div className="page-header">
        <h2>Available Classes</h2>
        <WeekSelector 
          currentWeek={currentWeek} 
          setCurrentWeek={setCurrentWeek}
        />
      </div>
      <ClassList 
        classes={classes} 
        fetchReservations={fetchReservations}
        currentWeek={currentWeek}
      />
    </div>
  );
};

export default BookingPage; 