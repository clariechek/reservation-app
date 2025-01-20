const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  day: { 
    type: String, 
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  time: { 
    type: String, 
    required: true 
  },
  instructor: { 
    type: String, 
    required: true 
  },
  duration: { 
    type: String, 
    required: true 
  },
  spots: { 
    type: Number, 
    required: true,
    min: 1 
  },
  spotsAvailable: { 
    type: Number,
    required: true,
    min: 0 
  }
});

module.exports = mongoose.model('Class', ClassSchema);