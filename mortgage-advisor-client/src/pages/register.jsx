import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Label, ImportantLabel } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { TailWindLink } from "../components/link";
import { useAuth } from "../context/AuthContext";

const RegistrationWrapper = styled.section`
  width: 100%;
  height: 100%;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.4);
  .dark {
    background-color: #111827;
  }
`;

const HtmlFormWrapper = styled.div`
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid black;
  background-color: white;
  border-radius: 1rem;

  @media  (min-width: 640px){
    padding: 0 2rem;
    margin-top:  0 2rem;;
    margin-bottom:  0 2rem;;
  }
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;

  .dark & {
    color: #ffffff;
  }
`;
const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;
const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;
const InputLabelWrapper = styled.div`
  margin-bottom: 1rem;
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
  const { login } = useAuth();
  const [errorMessages, setErrorMessages] = useState({});

  const navigate = useNavigate();

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
      login(response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Failed to register");
    }
  };
  return (
    <RegistrationWrapper>
      <HtmlFormWrapper>
        <PageTitle>דף הרשמה</PageTitle>

        <form onSubmit={handleSubmit}>
          <Title>משתמש חדש</Title>

          <InputLabelWrapper>
            <ImportantLabel htmlFor="pname">שם פרטי</ImportantLabel>
            <Input
              type="text"
              name="pname"
              id="pname"
              placeholder="שם פרטי"
              value={formData.pname}
              onChange={handleChange}
            />
            {errorMessages.pname && (
              <ErrorMessage>{errorMessages.pname}</ErrorMessage>
            )}
          </InputLabelWrapper>

          <InputLabelWrapper>
            <ImportantLabel htmlFor="lname">שם משפחה</ImportantLabel>
            <Input
              type="text"
              name="lname"
              id="lname"
              placeholder="שם משפחה"
              value={formData.lname}
              onChange={handleChange}
            />
            {errorMessages.lname && (
              <ErrorMessage>{errorMessages.lname}</ErrorMessage>
            )}
          </InputLabelWrapper>

          <InputLabelWrapper>
            <ImportantLabel htmlFor="phoneNumber">
              מספר טלפון נייד
            </ImportantLabel>
            <Input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="טלפון"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errorMessages.phoneNumber && (
              <ErrorMessage>{errorMessages.phoneNumber}</ErrorMessage>
            )}
          </InputLabelWrapper>

          <InputLabelWrapper>
            <ImportantLabel htmlFor="email">דואר אלקטרוני</ImportantLabel>
            <Input
              name="email"
              id="email"
              placeholder="דואר אלקטרוני"
              value={formData.email}
              onChange={handleChange}
            />
            {errorMessages.phoneNumber && (
              <ErrorMessage>{errorMessages.email}</ErrorMessage>
            )}
          </InputLabelWrapper>

          <InputLabelWrapper>
            <ImportantLabel htmlFor="password">סיסמה</ImportantLabel>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="סיסמה"
              value={formData.password}
              onChange={handleChange}
            />
            {errorMessages.password && (
              <ErrorMessage>{errorMessages.password}</ErrorMessage>
            )}
          </InputLabelWrapper>

          <InputLabelWrapper>
            <ImportantLabel htmlFor="rePassword">אישור סיסמה</ImportantLabel>
            <Input
              type="password"
              name="rePassword"
              id="rePassword"
              placeholder="אישור סיסמה"
              value={formData.rePassword}
              onChange={handleChange}
            />
            {errorMessages.rePassword && (
              <ErrorMessage>{errorMessages.rePassword}</ErrorMessage>
            )}
          </InputLabelWrapper>

          <Button type="submit">יצירת חשבון</Button>
          {errorMessages.form && (
            <ErrorMessage>{errorMessages.form}</ErrorMessage>
          )}

          <Label>
            כבר יש חשבון? <TailWindLink href="/login">התחברות</TailWindLink>
          </Label>
        </form>
      </HtmlFormWrapper>
    </RegistrationWrapper>
  );
};

export default Register;
