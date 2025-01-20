const express = require("express");
const router = express.Router();
const Class = require("../models/Class");

const { auth, authorize } = require('../middleware/auth');

/**
 * @route   GET /api/classes
 * @desc    Get all classes
 * @access  Public
 */
router.get("/", async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /api/classes
 * @desc    Create a new class
 * @access  Private (Admin/Staff only)
 */
router.post("/", auth, authorize('admin', 'staff'), async (req, res) => {
  try {
    const newClass = new Class(req.body);
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   PUT /api/classes/:id
 * @desc    Update a class
 * @access  Private (Admin/Staff only)
 */
router.put('/:id', auth, authorize('admin', 'staff'), async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   DELETE /api/classes/:id
 * @desc    Delete a class
 * @access  Private (Admin only)
 */
router.delete('/:id', auth, authorize('admin'), async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add this route to seed some sample data
router.post("/seed", async (req, res) => {
  try {
    const sampleClasses = [
      {
        name: "Yoga Special",
        day: "Monday",
        time: "09:00:00",
        instructor: "Sophie",
        duration: "55m",
        spots: 20,
        spotsAvailable: 20
      },
      {
        name: "Yoga Beginners",
        day: "Monday",
        time: "14:00:00",
        instructor: "Jane",
        duration: "45m",
        spots: 15,
        spotsAvailable: 15
      },
      {
        name: "Power Yoga",
        day: "Tuesday",
        time: "10:00:00",
        instructor: "Mike",
        duration: "60m",
        spots: 18,
        spotsAvailable: 18
      }
    ];

    await Class.deleteMany({}); // Clear existing classes
    await Class.insertMany(sampleClasses);
    
    console.log("Sample classes seeded");
    res.json({ message: "Sample classes seeded successfully" });
  } catch (err) {
    console.error("Error seeding classes:", err);
    res.status(500).json({ error: "Failed to seed classes" });
  }
});

module.exports = router;