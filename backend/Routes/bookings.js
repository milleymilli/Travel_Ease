const express = require("express");
const Booking = require("../models/Booking"); // references booking class in ../models/booking.js
const ValidateBooking = require("..middleware/validationMW"); //  validation middleware link

const router = express.Router();


// Get all bookings
router.get("/", (req, res) => 
  {
  res.json(Booking.findAll());  // returns all bookings as JSON
});

// Get booking by ID
router.get("/:id", (req, res) => 
  {
  const id = parseInt(req.params.id); // gets ID from URL and converts it to integer
  const booking = Booking.findById(id);
  if (!booking) return res.status(404).json({ error: "Booking not found" });  // returns 404 if not found
  res.json(booking);
});

// Create booking
router.post("/", ValidateBooking, (req, res) => 
  {
  const { name, date } = req.body; // gets name and date from request body

  if (!name || !date) {
    return res.status(400).json({ error: "Name and date are required" }); // returns 400 if either parameter is missing
  }

  const booking = Booking.create({ name, date });
  res.status(201).json(booking);  // returns 201 when/if created successfully
});

// Delete booking
router.delete("/:id", (req, res) => 
  {
  const id = parseInt(req.params.id); // gets ID from URL and converts it to integer
  const deleted = Booking.deleteById(id); // attempts to delete booking by ID

  if (!deleted) return res.status(404).json({ error: "Booking not found" }); // returns 404 if not found

  res.json(deleted); // returns deleted booking
});

module.exports = router; // makes it available to other files
