import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

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
    margin-top:  0 2rem;;
    margin-bottom:  0 2rem;;
  }
`;

const Message = styled.div`
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1rem;
  font-family: "Arial", sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled(Message)`
  color: #d32f2f;
  background-color: #ffebee;
`;

const SuccessMessage = styled(Message)`
  color: #2e7d32;
  background-color: #e8f5e9;
`;

const Recover = () => {
    const [formValues, setFormValues] = useState({ email: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        return email.match(
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(formValues.email)) {
            setError("כתובת דואר אלקטרוני לא תקינה");
            return;
        }

        setMessage('');
        setError('');
        try {
            await axios.post("http://localhost:3001/requestPasswordReset", { email: formValues.email });
            setMessage("קישור לאיפוס הסיסמא נשלח למייל שלך, לרשותך 25 דקות לשינוי הסיסמא");
        } catch (error) {
            console.error("Error requesting password reset:", error);
            setError("תקלה בבקשת איפוס הסיסמא");
        }
    };

    const handleInputChange = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    return (
        <Wrapper>
            <form onSubmit={handleSubmit} className="pt-8 flex flex-col gap-4">
                <div>
                    <ImportantLabel htmlFor="email">דואר אלקטרוני</ImportantLabel>
                    <Input
                        id="email"
                        name="email"
                        placeholder="הכנס דואר אלקטרוני"
                        value={formValues.email}
                        onChange={handleInputChange} />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                </div>
                <Button type="submit" disabled={!formValues.email}>שחזר סיסמה</Button>
                {message && <SuccessMessage>{message}</SuccessMessage>}
            </form>
        </Wrapper>
    );
};

export default Recover;
