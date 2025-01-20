const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

// Get all reservations
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reservations" });
  }
});

// Add a new reservation
router.post("/", async (req, res) => {
  console.log("POST /api/reservations hit");
  console.log("Request body:", req.body);

  const { name, email, date, time } = req.body;
  try {
    const newReservation = new Reservation({ name, email, date, time });
    await newReservation.save();
    res.status(201).json(newReservation); // Success response
  } catch (err) {
    console.error(err); // Log any errors
    res.status(500).json({ error: "Failed to create reservation" }); // Error response
  }
  // const newReservation = new Reservation({ name, email, date, time });
  // await newReservation.save();
  // res.json(newReservation);
});

module.exports = router;
