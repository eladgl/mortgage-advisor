import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ImportantLabel } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";

const Wrapper = styled.div`
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid black;
  background-color: white;
  border-radius: 1rem;
  height: 100%;

  @media (min-width: 640px) {
    padding: 0 2rem;
    margin-bottom: 2rem;
  }
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
  font-size: 1rem;
  font-family: "Arial", sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ResetPassword = () => {
  const [formValues, setFormValues] = useState({
    newPassword: "",
    repeatNewPassword: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [serverError, setServerError] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Verify the token when the component loads
    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/verifyResetToken/${token}`);
        console.log(response.data); // Handle response appropriately
      } catch (error) {
        console.error("Error verifying token:", error);
        setServerError("Token verification failed or token expired.");
        navigate('/recover'); // Redirect to recover page or display message
      }
    };
    
    verifyToken();
  }, [token, navigate]);

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
      await axios.post("http://localhost:3001/resetPassword", {
        token,
        newPassword: formValues.newPassword,
      });
      setErrorMessages({});
      alert("הסיסמא שונתה בהצלחה.");
      navigate('/login');
    } catch (error) {
      console.error("Error resetting password:", error);
      setServerError("שגיאה באיפוס הסיסמא.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Wrapper>
      {serverError ? (
        <ErrorServerMessage>{serverError}</ErrorServerMessage>
      ) : (
        <form onSubmit={handleSubmit}>
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
            {errorMessages.newPassword && (
              <ErrorMessage>{errorMessages.newPassword}</ErrorMessage>
            )}
          </GridCell>

          <GridCell>
            <ImportantLabel htmlFor="repeatNewPassword">
              אישור סיסמא חדשה
            </ImportantLabel>
            <Input
              type="password"
              id="repeatNewPassword"
              name="repeatNewPassword"
              placeholder="אישור סיסמא חדשה"
              value={formValues.repeatNewPassword}
              onChange={handleInputChange}
            />
            {errorMessages.repeatNewPassword && (
              <ErrorMessage>{errorMessages.repeatNewPassword}</ErrorMessage>
            )}
          </GridCell>

          <GridCell>
            <Button type="submit">אפס סיסמה</Button>
          </GridCell>
        </form>
      )}
    </Wrapper>
  );
};

export default ResetPassword;
