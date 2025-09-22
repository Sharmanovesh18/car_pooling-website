import express from 'express';
import Ride from '../models/Ride.js';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { source, destination, date, time, fare, driver, vehicleType, remainingSeats } = req.body;
    const newRide = new Ride({
      source,
      destination,
      date,
      time,
      fare,
      driver,
      vehicleType,
      remainingSeats
    });
    await newRide.save();
    res.status(201).json(newRide);
  } catch (err) {
    console.error("Error creating ride:", err);
    res.status(500).send("Failed to create ride.");
  }
});

export default router;