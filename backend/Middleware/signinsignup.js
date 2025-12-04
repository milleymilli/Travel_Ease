const express = require("express");
const router = express.Router();

// Mock data
let users = [
  { id: 1, username: "john", password: "1234" },
  { id: 2, username: "jane", password: "abcd" },
];

// Sign-Up 
router.post("/signup", (req, res) => 
  {
  const { username, password } = req.body;

  // if either field is missing, return 400 error

  if (!username || !password)
     {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Check for existing user by comparing requested username with mock data
  const existingUser = users.find(user => user.username === username);
  if (existingUser) 
    {
    return res.status(409).json({ error: "Username already taken, please choose another" });
  }

    // add the new user to the mock data array
  const newUser = { id: users.length + 1, username, password };
  users.push(newUser);

  // display success message with 201 code
  res.status(201).json({ message: "User created successfully", user: newUser });
});

// Sign-In 
router.post("/signin", (req, res) => 
  {
  const { username, password } = req.body;

  // if etiher field is missing, return 400 error
  if (!username || !password) 
    {
    return res.status(400).json({ error: "Username and password are required" });
  }

    // find user in mock data by checking if username and password match
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) // if there's no match, return 401 error
    {
    return res.status(401).json({ error: "Invalid username or password, please create an account or try again" });
  }
  // if match is found, return success message with user data
  res.json({ message: "Sign-in successful", user });
});

// Export the router for use in other places
module.exports = router;
