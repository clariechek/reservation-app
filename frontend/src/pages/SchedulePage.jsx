// import React from 'react';
// import ReservationList from '../components/ReservationList';

// const ReservationsPage = ({ reservations }) => {
//   return (
//     <div className="reservations-page">
//       <div className="page-header">
//         <h2>My Reservations</h2>
//       </div>
//       <ReservationList reservations={reservations} />
//     </div>
//   );
// };

// export default ReservationsPage; 

import React, { useState } from 'react';
import CalendarView from '../components/CalendarView';
import WeekSelector from '../components/WeekSelector';

const SchedulePage = ({ reservations }) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const handleSelectClass = (classInfo) => {
    // Handle class selection - you can add your logic here
    console.log('Selected class:', classInfo);
  };

  return (
    <div className="schedule-page">
      <div className="page-header">
        <h2>Class Schedule</h2>
        <WeekSelector 
          currentWeek={currentWeek} 
          setCurrentWeek={setCurrentWeek}
        />
      </div>
      <CalendarView 
        reservations={reservations}
        currentWeek={currentWeek}
        onSelectClass={handleSelectClass}
      />
    </div>
  );
};

export default SchedulePage;