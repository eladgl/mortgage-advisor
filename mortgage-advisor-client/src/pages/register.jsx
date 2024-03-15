import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Wrapper = styled.div`
  padding-top: 8rem;
  background-color: #f4f7fa;
  min-height: calc(100vh - 8rem);
  display: flex;
  flex-direction: column; // Align children vertically
  align-items: center; // Center children horizontally
  min-height: 91vh;

`;

const Form = styled.form`
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); // two columns on larger screens
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
`;

const InputTitle = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
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
  font-size: 1rem;
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
`;
const ButtonGroup = styled.div`
  grid-column: 1 / -1; // Span button group across all columns
  display: flex;
  flex-direction: column;
  align-items: center; // Center the button and link vertically
`;

const Register = () => {
  const [formData, setFormData] = useState({
    pname: "",
    lname: "",
    phoneNumber: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const titles = {
    pname: "שם פרטי",
    lname: "שם משפחה",
    phoneNumber: "מספר טלפון",
    email: "דואר אלקטרוני",
    password: "סיסמה",
    rePassword: "אישור סיסמה",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.pname.trim()) {
      errors.pname = "שם פרטי הינו שדה חובה";
      isValid = false;
    }

    if (!formData.lname.trim()) {
      errors.lname = "שם משפחה הינו שדה חובה";
      isValid = false;
    }

    const phoneRegex = /^(\+\d{1,3})?\d{10}$/;
    if (!formData.phoneNumber.match(phoneRegex)) {
      errors.phoneNumber = "מספר טלפון לא נכון, חייב להיות באורך 10 ספרות";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailRegex)) {
      errors.email = "כתובת אימייל שגויה";
      isValid = false;
    }

    if (formData.password.length < 6) {
      errors.password = "סיסמא צריכה להיות ארוכה מ6 תוים";
      isValid = false;
    }

    if (formData.password !== formData.rePassword) {
      errors.rePassword = "אישור סיסמא לא זהה לסיסמא";
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        formData
      );
      login(response.data.token, response.data.user);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register");
    }
  };

  return (
    <Wrapper>
      <PageTitle>דף הרשמה</PageTitle>
      <Form onSubmit={handleSubmit} >
        {Object.keys(titles).map((key) => (
          <InputGroup key={key}>
            <InputTitle>{titles[key]}</InputTitle>
            <Input
              type={key.includes("assword") ? "password" : "text"}
              name={key}
              placeholder={titles[key]}
              value={formData[key]}
              onChange={handleChange}
            />
            {errorMessages[key] && <ErrorMessage>{errorMessages[key]}</ErrorMessage>}
          </InputGroup>
        ))}
      <ButtonGroup>
        <Button type="submit">יצירת חשבון</Button>
        {errorMessages.form && <ErrorMessage>{errorMessages.form}</ErrorMessage>}
        <Link href="/login">כבר יש חשבון? התחברות</Link>
      </ButtonGroup>
      </Form>
    </Wrapper>
  );
};

export default Register;
