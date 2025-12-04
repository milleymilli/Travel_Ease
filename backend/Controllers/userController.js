// backend/Controllers/userController.js

const mockUsers = [
    { id: 1, name: "Alice Smith", email: "alice@example.com", role: "admin" },
    { id: 2, name: "Bob Jones", email: "bob@example.com", role: "customer" }
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

// Sign-Up 
const signup = (req, res, next) => {
    try {
        console.log("BODY RECEIVED:", req.body);
        const { name, email, password, role } = req.body;

        // if either field is missing, return 400 error
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name, email, and password are required" });
        }

        // Check for existing user by comparing requested email with mock data
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
            return res.status(409).json({ error: "Email already taken" });
        }

        // add the new user to the mock data array
        const newUser = {
            id: mockUsers.length + 1,
            name,
            email,
            role: role || "customer",
            password
        };
        mockUsers.push(newUser);

        // display success message with 201 code
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser
        });
    } catch (error) {
        next(error);
    }
};

// Sign-In 
const signin = (req, res, next) => {
    try {
        const { email, password } = req.body;

        // if either field is missing, return 400 error
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // find user in mock data by checking if email and password match
        const user = mockUsers.find(u => u.email === email && u.password === password);

        if (!user) // if there's no match, return 401 error
        {
            return res.status(401).json({ error: "Invalid email or password, please create an account or try again" });
        }

        // if match is found, return success message with user data
        res.json({
            success: true,
            message: "Sign-in successful",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getUsers, createUser, signin, signup };
