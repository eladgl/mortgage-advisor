// Import express module using ES6 import syntax
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  registerUser,
  loginUser,
  changePassword,
  getUserDataById,
  storeCheck,
  storeResetToken,
  getUserByEmail,
  getUserByResetToken,
  resetPassword,
  clearResetToken
} from "./db/firebaseConfig.js";
import { sendMail, recoverMail } from "./utilities/mails.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto'; // For generating random tokens
import config from "./access/configs/config.js";

// Create an express application
const app = express();
app.use(cors());
app.use(bodyParser.json());
const jwtSecret = process.env.JWT_SECRET;

// Define a port number
const port = 3001; // Ensure this port is different from your React app's port

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Add a GET route
app.get("/test", (req, res) => {
  // Send a response when this route is accessed
  res.json({ message: "Connection successful!" });
});

app.get("/userData", authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const userData = await getUserDataById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove sensitive data before sending it to the client
    delete userData.password;
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res
      .status(500)
      .json({ message: "Error fetching user data", error: error.message });
  }
});

// Create an endpoint to store check details
app.post("/storeCheck", async (req, res) => {
  try {
    const checkDetails = req.body;
    const result = await storeCheck(checkDetails);

    res.status(200).json({
      message: "Check stored successfully",
      data: result
    });
  } catch (error) {
    console.error("Error storing check:", error);
    res.status(500).json({
      message: "Failed to store check",
      error: error.message
    });
  }
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

app.post("/contact", async (req, res) => {
  const formData = req.body; // Access form data from the request body
  // Process the form data, such as saving it to a database or sending it via email
  console.log("Received form data:", formData);
  await sendMail(formData).catch((e) => console.log(e));
  // Send a response to the client
  res.status(200).json({ message: "Form submitted successfully" });
});


app.post("/requestPasswordReset", async (req, res) => {
  const { email } = req.body;
  try {
      const user = await getUserByEmail(email);
      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetExpires = Date.now() + 25 * 60 * 1000; // 25 minutes from now

      await storeResetToken(user.id, resetToken, resetExpires);

      const resetLink = `http://${config.URL}:5173/resetPassword/${resetToken}`;
      await recoverMail({ email, link: resetLink });

      res.status(200).json({ message: "Reset password link sent to email." });
  } catch (error) {
      console.error("Error requesting password reset:", error);
      res.status(500).json({ message: "Error requesting password reset." });
  }
});

// Endpoint to verify reset token
app.get("/verifyResetToken/:token", async (req, res) => {
  const { token } = req.params;
  try {
      const user = await getUserByResetToken(token);
      if (!user) {
          return res.status(404).json({ message: "Invalid token." });
      }

      const now = new Date();
      if (user.resetTokenExpires < now) {
          return res.status(400).json({ message: "Token has expired." });
      }

      res.status(200).json({ message: "Token is valid.", userId: user.id });
  } catch (error) {
      console.error("Error verifying token:", error);
      res.status(500).json({ message: "Error verifying token." });
  }
});
// Endpoint to reset password
app.post("/resetPassword", async (req, res) => {
  const { token, newPassword } = req.body;
  try {
      const user = await getUserByResetToken(token);
      if (!user) {
          return res.status(404).json({ message: "Invalid token." });
      }

      const now = new Date();
      if (user.resetTokenExpires < now) {
          return res.status(400).json({ message: "Token has expired." });
      }

      await resetPassword(user.id, newPassword);
      await clearResetToken(user.id);

      res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Error resetting password." });
  }
});

// Endpoint for changing password
app.post("/changePassword", authenticateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; // Extract userId from the token

  try {
    const result = await changePassword(userId, oldPassword, newPassword);
    if (result) {
      res.status(200).json({ message: "Password changed successfully" });
    }
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://${config.URL}:${port}`);
});
