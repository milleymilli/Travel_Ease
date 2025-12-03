// backend/Controllers/userController.js

const mockUsers = [
    { id: 1, name: "Admin User", email: "admin@travelease.com", role: "admin" },
    { id: 2, name: "John Doe", email: "customer@travelease.com", role: "customer" }
];

// Get all users
const getUsers = (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            count: mockUsers.length,
            data: mockUsers
        });
    } catch (error) {
        next(error);
    }
};

// Create a new user (Mock)
const createUser = (req, res, next) => {
    try {
        const newUser = req.body;
        // In a real app, we would validate and save to DB here
        console.log("User received:", newUser);
        
        res.status(201).json({
            success: true,
            message: "User created successfully (Mock)",
            data: newUser
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getUsers, createUser };