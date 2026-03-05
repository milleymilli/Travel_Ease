const db = require("../config/db");

// 1. Get all users
const getUsers = async (req, res, next) => {
  try {
    const [rows] = await db.execute("SELECT id, name, email, role FROM users");
    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Sign-Up / Create User (Consolidated into one solid function)
const signup = async (req, res, next) => {
  try {
    console.log("BODY RECEIVED:", req.body);
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    // Check if email already exists
    const [existing] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: "Email already taken" });
    }

    // Insert into MySQL
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    const [result] = await db.execute(sql, [name, email, password, role || "customer"]);

    console.log("DATABASE SAVE SUCCESSFUL. ID:", result.insertId); // Added this log for you!

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { id: result.insertId, name, email },
    });
  } catch (error) {
    console.error("DATABASE ERROR:", error); // This will show in VS Code terminal if it fails
    next(error);
  }
};

// 3. Sign-In
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const [users] = await db.execute(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (users.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const user = users[0];
    res.json({
      success: true,
      message: "Sign-in successful",
      data: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// Alias createUser to signup so the original routes still work
const createUser = signup;

module.exports = { getUsers, createUser, signin, signup };