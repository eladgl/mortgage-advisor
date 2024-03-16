import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ImportantLabel } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Title } from "../components/Title";
import config from "../access/configs/config";
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 93vh;
  background-color: #f4f7fa;
  font-size:14px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  padding: 2rem;
  margin: auto;
  margin-top: 72px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size:14px;

`;

const GridCell = styled.div`
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;

const ErrorServerMessage = styled.div`
  color: #d32f2f;
  background-color: #ffebee;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
  font-family: "Arial", sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ChangePassword = () => {
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState({});
  const [serverError, setServerError] = useState("");

  const validatePasswords = () => {
    const errors = {};
    if (formValues.newPassword.length < 6) {
      errors.newPassword = "סיסמא חדשה צריכה להיות באורך של לפחות 6 תווים.";
    } else if (formValues.newPassword !== formValues.repeatNewPassword) {
      errors.repeatNewPassword = "הסיסמאות החדשות לא תואמות.";
    }
    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;
    setServerError(""); // Clear previous server error

    try {
      const response = await axios.post(
        `http://${config.URL}:3001/changePassword`,
        {
          oldPassword: formValues.oldPassword,
          newPassword: formValues.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setErrorMessages({});
      navigate('/');
      alert("הסיסמא שונתה בהצלחה.");
    } catch (error) {
      console.error("Error changing password:", error);
      setServerError("שגיאה בשינוי הסיסמא.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
      <Title>שינוי סיסמא</Title>

        <GridCell>
          <ImportantLabel htmlFor="oldPassword">סיסמא ישנה</ImportantLabel>
          <Input
            type="password"
            id="oldPassword"
            name="oldPassword"
            placeholder="סיסמא ישנה"
            value={formValues.oldPassword}
            onChange={handleInputChange}
          />
        </GridCell>
        <GridCell>
          <ImportantLabel htmlFor="newPassword">סיסמא חדשה</ImportantLabel>
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="סיסמא חדשה"
            value={formValues.newPassword}
            onChange={handleInputChange}
          />
          {errorMessages.newPassword && <ErrorMessage>{errorMessages.newPassword}</ErrorMessage>}
        </GridCell>
        <GridCell>
          <ImportantLabel htmlFor="repeatNewPassword">אישור סיסמא חדשה</ImportantLabel>
          <Input
            type="password"
            id="repeatNewPassword"
            name="repeatNewPassword"
            placeholder="אישור סיסמא חדשה"
            value={formValues.repeatNewPassword}
            onChange={handleInputChange}
          />
          {errorMessages.repeatNewPassword && <ErrorMessage>{errorMessages.repeatNewPassword}</ErrorMessage>}
        </GridCell>
        {serverError && <ErrorServerMessage>{serverError}</ErrorServerMessage>}
        <GridCell>
          <Button type="submit">שנה סיסמא</Button>
        </GridCell>
      </Form>
    </Wrapper>
  );
};

export default ChangePassword;
