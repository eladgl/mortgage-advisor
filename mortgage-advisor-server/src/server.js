// Import express module using ES6 import syntax
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  registerUser,
  loginUser,
  getUserPassword,
} from "./db/firebaseConfig.js";
import { sendMail, recoverMail } from "./utilities/mails.js";
import jwt from "jsonwebtoken";

// Create an express application
const app = express();
app.use(cors());
app.use(bodyParser.json());
const jwtSecret = process.env.JWT_SECRET;

// Define a port number
const port = 3001; // Ensure this port is different from your React app's port

// Add a GET route
app.get("/test", (req, res) => {
  // Send a response when this route is accessed
  res.json({ message: "Connection successful!" });
});

// Endpoint for registering a new user
app.post("/register", async (req, res) => {
  try {
    if (req.body.password !== req.body.rePassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await registerUser(req.body);

    if (user && user.id) {
      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });
      res
        .status(201)
        .json({ message: "User registered successfully", token, user: user });
    } else {
      throw new Error("User registration failed");
    }
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
    const user = await loginUser(email, password);

    if (user && user.id) {
      const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });
      res
        .status(200)
        .json({ message: "User logged in successfully", token, user: user });
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Login failed", error: error.message });
  }
});

app.post("/contactUs", (req, res) => {
  const formData = req.body; // Access form data from the request body
  // Process the form data, such as saving it to a database or sending it via email
  console.log("Received form data:", formData);
  sendMail(formData).catch((e) => console.log(e));
  // Send a response to the client
  res.status(200).json({ message: "Form submitted successfully" });
});

app.post("/recover", async (req, res) => {
  const { email } = req.body;
  try {
    // Fetch user's password from the database
    const password = await getUserPassword(email);

    // Send password via email
    await recoverMail({ email, password });

    res
      .status(200)
      .json({ message: "Password sent successfully to user's email" });
  } catch (error) {
    console.error("Error sending password:", error);
    res
      .status(500)
      .json({ message: "Failed to send password", error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
