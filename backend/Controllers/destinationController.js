// backend/Controllers/destinationController.js

console.log("TRACE: 1. Controller file loaded.");

const mockDestinations = [
    { 
        id: 101, 
        location: "Paris, France", 
        price: 450, 
        stock: 20, 
        image: "/images/paris.jpg"
    },
    { 
        id: 102, 
        location: "Tokyo, Japan", 
        price: 850, 
        stock: 15, 
        image: "/images/tokyo.jpg"
    },
    { 
        id: 103, 
        location: "New York, USA", 
        price: 600, 
        stock: 50, 
        image: "/images/usa.jpg"
    }
];

// Get all destinations
const getDestinations = (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            count: mockDestinations.length,
            data: mockDestinations
        });
    } catch (error) {
        next(error);
    }
};

// Get single destination by ID
const getDestinationById = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const destination = mockDestinations.find(d => d.id === id);

        if (!destination) {
            const error = new Error(`Destination not found with id of ${id}`);
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: destination
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getDestinations, getDestinationById };