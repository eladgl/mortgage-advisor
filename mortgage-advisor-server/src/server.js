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
    // Ensure the passwords match before proceeding with registration
    if (req.body.password !== req.body.rePassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const userId = await registerUser(req.body); // req.body should contain the required fields
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

app.post("/contactUs", (req, res) => {
  const formData = req.body; // Access form data from the request body
  // Process the form data, such as saving it to a database or sending it via email
  console.log("Received form data:", formData);
  // Send a response to the client
  res.status(200).json({ message: "Form submitted successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
