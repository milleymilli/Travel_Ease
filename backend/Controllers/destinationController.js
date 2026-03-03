// backend/Controllers/destinationController.js

console.log("TRACE: 1. Controller file loaded (Destinations - REAL DB).");

// 1. Import your real database connection
const db = require("../config/db");

// Get all destinations from MySQL
const getDestinations = async (req, res, next) => {
    try {
        const [rows] = await db.execute("SELECT * FROM destinations");
        
        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        console.error("DATABASE ERROR fetching destinations:", error);
        next(error);
    }
};

// Get single destination by ID from MySQL
const getDestinationById = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const [rows] = await db.execute("SELECT * FROM destinations WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({ 
                success: false,
                error: `Destination not found with id of ${id}` 
            });
        }

        res.status(200).json({
            success: true,
            data: rows[0] // Return the single matching row
        });
    } catch (error) {
        console.error(`DATABASE ERROR fetching destination ${req.params.id}:`, error);
        next(error);
    }
};

module.exports = { getDestinations, getDestinationById };