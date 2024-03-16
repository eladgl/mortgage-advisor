import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const Wrapper = styled.div`
  padding-top: 8rem;
  background-color: #f4f7fa;
  min-height: 93vh;
  font-size: 14px;

`;
const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1rem;
  font-family: "Arial", sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 18px;

`;
const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Link = styled.a`
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: #007bff;
  text-decoration: none;
`;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        formValues
      );
      console.log("Login successful:", response.data);
      login(response.data.token, response.data.user);
      navigate("/");
    } catch (error) {
      setError("Login failed, please check your credentials.");
      console.error("Error logging in:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Wrapper>
      <PageTitle>דף התחברות</PageTitle>

      <Form onSubmit={handleSubmit}>
        <div>
          <Input
            placeholder="כתובת האימייל שלך"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="הסיסמא שלך"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Button type="submit">התחברות</Button>
        <Link href="recover">שכחת סיסמא?</Link>
        <Link href="registration">הרשמה</Link>
      </Form>
    </Wrapper>
  );
};

export default Login;
