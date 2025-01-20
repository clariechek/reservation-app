const mongoose = require('mongoose');

/**
 * User Schema
 * Defines the structure for user documents in MongoDB
 */
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  // Role defines user permissions: student, instructor, admin, or staff
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin', 'staff'],
    default: 'student'
  },
  phoneNumber: String,
  // Emergency contact information
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  // Membership details
  membershipType: {
    type: String,
    enum: ['none', 'basic', 'premium', 'unlimited'],
    default: 'none'
  },
  membershipExpiry: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: Date,
  isActive: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('User', UserSchema); 