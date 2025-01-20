import React, { useState } from "react";
import axios from "axios";

const ReservationForm = ({ fetchReservations }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await axios.post("http://localhost:5001/api/reservations", formData);
      alert("Reservation added!");
      setFormData({ name: "", email: "", date: "", time: "" }); // Reset form after submission
      
      // Fetch updated reservations after successful submission
      fetchReservations();
    } catch (err) {
      console.error(err);
      alert("Failed to add reservation");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        name="time"
        type="time"
        value={formData.time}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReservationForm;
