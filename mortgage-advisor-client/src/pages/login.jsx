import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure this matches your server's login endpoint
      const response = await axios.post(
        "http://localhost:3001/login",
        loginData
      );
      console.log("Login successful:", response.data);
      alert("Login successful");
      // Here you could also redirect the user or save the login state
    } catch (error) {
      console.error("Login error:", error);
      alert("Failed to login");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
