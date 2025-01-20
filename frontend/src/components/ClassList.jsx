import React from "react";
import axios from "axios";

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ClassList = ({ classes, fetchReservations, currentWeek }) => {
  const formatTimeToAMPM = (timeString) => {
    try {
      if (!timeString) return '';
      const [hours, minutes] = timeString.split(':');
      let hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12;
      hour = hour ? hour : 12;
      return `${hour}:${minutes} ${ampm}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return timeString;
    }
  };

  const getDateForDay = (day) => {
    const today = new Date();
    const currentDay = today.getDay();
    const dayIndex = DAYS_OF_WEEK.indexOf(day);
    
    // Calculate days to add based on current week
    const daysToAdd = dayIndex - currentDay + (currentWeek * 7);
    
    const date = new Date(today);
    date.setDate(today.getDate() + daysToAdd);
    
    return date;
  };

  const formatDate = (day) => {
    const date = getDateForDay(day);
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${day}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  const handleBookClass = async (classInfo) => {
    const name = prompt("Enter your name:");
    const email = prompt("Enter your email:");
    if (!name || !email) {
      alert("Name and email are required to book a class.");
      return;
    }

    const reservation = {
      name,
      email,
      date: getDateForDay(classInfo.day).toISOString().split("T")[0],
      time: classInfo.time,
      className: classInfo.name,
    };

    try {
      await axios.post("http://localhost:5001/api/reservations", reservation);
      alert(`Successfully booked ${classInfo.name} on ${classInfo.day} at ${formatTimeToAMPM(classInfo.time)}`);
      fetchReservations();
    } catch (err) {
      console.error("Error booking class:", err);
      alert("Failed to book class.");
    }
  };

  return (
    <div className="class-schedule">
      {DAYS_OF_WEEK.map((day) => (
        <div key={day} className="day-section">
          <h3 className="day-header">{formatDate(day)}</h3>
          <div className="class-table">
            <div className="class-table-header">
              <div className="cell">Time</div>
              <div className="cell">Class</div>
              <div className="cell">Instructor</div>
              <div className="cell">Duration</div>
              <div className="cell">Spots</div>
              <div className="cell"></div>
            </div>
            {classes
              .filter((classInfo) => classInfo.day === day)
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((classInfo) => (
                <div key={`${classInfo.name}-${classInfo.time}`} className="class-row">
                  <div className="cell">{formatTimeToAMPM(classInfo.time)}</div>
                  <div className="cell">{classInfo.name}</div>
                  <div className="cell">{classInfo.instructor}</div>
                  <div className="cell">{classInfo.duration}</div>
                  <div className="cell">{classInfo.spotsAvailable}/{classInfo.spots}</div>
                  <div className="cell">
                    <button 
                      className="book-button"
                      onClick={() => handleBookClass(classInfo)}
                    >
                      BOOK
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassList;
