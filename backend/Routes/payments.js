const express = require("express");     // import express
const Payment = require("../controllers/payment");   // import payment class

const router = express.Router();

// Get all payments
router.get("/", (req, res) => 
    {
  res.json(Payment.findAll());  // returns all payments in JSON format
});

// Get payment by ID
router.get("/:id", (req, res) => 
    {
  const id = parseInt(req.params.id);   // gets ID from URL and converts from string to int
  const payment = Payment.findById(id);
  if (!payment) return res.status(404).json({ error: "Payment not found" });    // returns error 404 if not found
  res.json(payment);
});

//Create a payment
router.post("/", (req, res) => 
    {
  const { bookingId, amount, method } = req.body;   // gets ID, amount and method from request

  if (!bookingId || !amount || !method) {
    return res.status(400).json({ error: "bookingId, amount, and method are required" });   // if any are missing, return 400
  }

  const payment = Payment.create({ bookingId, amount, method }); //creates new payment
  res.status(201).json(payment); // return 201 (created)  
});

// Delete payment
router.delete("/:id", (req, res) => 
    {
  const id = parseInt(req.params.id);   // gets ID from URL and converts from string to int
  const deleted = Payment.deleteById(id); // deletes payment with matching ID

  if (!deleted) return res.status(404).json({ error: "Payment not found" });   // returns error 404 if ID not found

  res.json(deleted);  // returns deleted payment
});


module.exports = router; // makes it available to server.js
