const express = require('express');
const Reservation = require('../models/Reservation');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Create a new reservation (public route)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;

    // Create new reservation
    const reservation = new Reservation({
      name,
      email,
      phone,
      date,
      time,
      guests,
      // If user is logged in, associate the reservation with their account
      userId: req.user ? req.user._id : null
    });

    await reservation.save();

    res.status(201).json({
      success: true,
      data: reservation
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all reservations (admin and staff only)
router.get('/', authenticate, authorize('admin', 'staff'), async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ date: 1 });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's reservations
router.get('/my-reservations', authenticate, async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.user._id }).sort({ date: 1 });
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update reservation status (admin and staff only)
router.put('/:id/status', authenticate, authorize('admin', 'staff'), async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete reservation (admin only)
router.delete('/:id', authenticate, authorize('admin'), async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    
    res.json({ message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;