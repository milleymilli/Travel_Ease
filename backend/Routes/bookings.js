const express = require("express");
const Booking = require("../Controllers/booking"); // Your new database booking logic
const ValidateBooking = require("../middleware/validationMW"); // Fixed the missing slash!

const router = express.Router();

// Get all bookings (Upgraded to async)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Database error fetching bookings" });
  }
});

// Get booking by ID (Upgraded to async)
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Database error fetching booking" });
  }
});


router.post("/", async (req, res) => {
  try {
    // We now require destination_id from the frontend basket
    const { name, date, destination_id } = req.body;

    if (!name || !date || !destination_id) {
      return res.status(400).json({ error: "Name, date, and destination_id are required" });
    }

    // This calls your new Booking.create(), which updates the MySQL stock!
    const booking = await Booking.create({ name, date, destination_id });
    
    res.status(201).json({
      success: true,
      message: "Checkout complete! Ticket stock updated.",
      booking: booking
    });
  } catch (error) {
    // If the flight is sold out, this catches the error and sends it to the user
    res.status(400).json({ error: error.message });
  }
});

// Delete booking (Upgraded to async)
router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await Booking.deleteById(id);
    if (!deleted) return res.status(404).json({ error: "Booking not found" });
    res.json({ success: true, message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ error: "Database error deleting booking" });
  }
});

module.exports = router;