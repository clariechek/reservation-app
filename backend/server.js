/**
 * Main server file for the Yoga Studio application
 * Sets up Express server with middleware and routes
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const classRoutes = require("./routes/classes");
const reservationRoutes = require("./routes/reservations");

const app = express();

// Middleware configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true // Allow credentials for cross-origin requests
}));
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON request bodies

// Route definitions
app.use("/api/classes", classRoutes);
app.use("/api/reservations", reservationRoutes);
app.use('/api/auth', require('./routes/auth'));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
