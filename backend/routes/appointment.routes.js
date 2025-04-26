const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment.model');
const { protect, admin } = require('../middleware/auth');

// Book appointment
router.post('/', protect, async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot, reason } = req.body;

    // Check if slot is available
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate: new Date(appointmentDate),
      timeSlot,
      status: 'scheduled'
    });

    if (existingAppointment) {
      return res.status(400).json({ message: 'Time slot already booked' });
    }

    const appointment = await Appointment.create({
      patientId: req.user._id,
      doctorId,
      appointmentDate,
      timeSlot,
      reason
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get patient appointments
router.get('/my-appointments', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user._id })
      .populate('doctorId', 'name specialty')
      .sort({ appointmentDate: 1 });
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get doctor appointments
router.get('/doctor-appointments', protect, admin, async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctorId: req.user._id })
      .populate('patientId', 'name patientId phone email')
      .sort({ appointmentDate: 1 });
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update appointment status
router.put('/:id', protect, async (req, res) => {
  try {
    const { status } = req.body;
    
    const appointment = await Appointment.findById(req.params.id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if the user is authorized to update this appointment
    if (
      (req.user.role === 'patient' && appointment.patientId.toString() !== req.user._id.toString()) ||
      (req.user.role === 'doctor' && appointment.doctorId.toString() !== req.user._id.toString())
    ) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    appointment.status = status;
    
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;