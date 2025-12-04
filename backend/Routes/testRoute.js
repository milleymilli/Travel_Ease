const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const [flights] = await pool.query(
      "SELECT flight_number, airline_name, airline_logo_url, departure_city FROM flights"
    );

    res.status(200).json(flights);
  } catch (error) {
    console.log("Error retrieving client data:", error);
    res
      .status(500)
      .json({ message: "Milley failed to retrieve User data from database." });
  }
});

module.exports = router;
