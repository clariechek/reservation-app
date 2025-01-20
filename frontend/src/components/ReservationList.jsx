import React from "react";

const ReservationList = ({ reservations }) => {
  return (
    <div className="reservations-container">
      {reservations.length === 0 ? (
        <p>No reservations available.</p>
      ) : (
        <ul className="reservations-list">
          {reservations.map((res) => (
            <li key={res._id} className="reservation-item">
              <div className="reservation-details">
                <h3>{res.className}</h3>
                <p>
                  <span className="detail-label">Date:</span> {res.date}
                </p>
                <p>
                  <span className="detail-label">Time:</span> {res.time}
                </p>
                <p>
                  <span className="detail-label">Name:</span> {res.name}
                </p>
                <p>
                  <span className="detail-label">Email:</span> {res.email}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservationList;

