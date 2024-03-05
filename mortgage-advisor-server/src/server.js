// Import express module using ES6 import syntax
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { registerUser, loginUser } from "./db/firebaseConfig.js";

// Create an express application
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define a port number
const port = 3001; // Ensure this port is different from your React app's port
console.log("***", process.env.FIREBASE_PRIVATE_KEY_ID);

// Add a GET route
app.get("/test", (req, res) => {
  // Send a response when this route is accessed
  res.json({ message: "Connection successful!" });
});

// Endpoint for registering a new user
app.post("/register", async (req, res) => {
  try {
    const userId = await registerUser(req.body); // req.body should contain email, username, password, and any additionalInfo
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
});

// Endpoint for user login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userId = await loginUser(email, password);
    // Implement token generation or session management as needed
    res.status(200).json({ message: "User logged in successfully", userId });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Login failed", error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
