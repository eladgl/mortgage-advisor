import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { ImportantLabel, Label } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";
import Select from "../components/select";
import TextArea from "../components/textArea";
import { Title } from "../components/Title";
import config from "../access/configs/config";

import * as access from "@access";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 93vh;
  background-color: #f4f7fa;
  font-size: 14px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  margin: auto;
  margin-top: 72px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;

`;

const GridCell = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const TwoCells = styled(GridCell)`
  grid-column: span 2;
`;

const ContactUs = () => {
  const [message, setMessage] = useState('');
  const [formValues, setFormValues] = useState({
    fname: '',
    lname: '',
    phone: '',
    email: '',
    reason: '',
    contactMessage: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      formValues.fname !== '' &&
      formValues.lname !== '' &&
      formValues.phone !== '' &&
      formValues.email !== '' &&
      formValues.reason !== '' &&
      formValues.contactMessage !== ''
    );
  }, [formValues]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    try {
      const response = await axios.post(`http://${config.URL}:3001/contactUs`, formValues);
      setMessage("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("failure");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const renderForm = () => (
    <Form onSubmit={handleSubmit}>
      <Title>טופס יצירת קשר</Title>
      <div className="grid grid-cols-2 gap-4">
        <GridCell>
          <ImportantLabel htmlFor="fname">שם פרטי</ImportantLabel>
          <Input
            type="text"
            name="fname"
            id="fname"
            placeholder="שם פרטי"
            value={formValues.fname}
            onChange={handleInputChange}
            required
          />
        </GridCell>
        <GridCell>
          <ImportantLabel htmlFor="lname">שם משפחה</ImportantLabel>
          <Input
            type="text"
            id="lname"
            name="lname"
            placeholder="שם משפחה"
            value={formValues.lname}
            onChange={handleInputChange}
          />
        </GridCell>
        <GridCell>
          <ImportantLabel htmlFor="phone">מספר טלפון נייד</ImportantLabel>
          <Input
            type="tel"
            id="phone"
            name="phone"
            placeholder="טלפון"
            value={formValues.phone}
            onChange={handleInputChange}
          />
        </GridCell>
        <GridCell>
          <ImportantLabel htmlFor="email">דואר אלקטרוני</ImportantLabel>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="דואר אלקטרוני"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </GridCell>
        <TwoCells>
          <ImportantLabel htmlFor="reason">נושא הפנייה</ImportantLabel>
          <Select
            id="reason"
            name="reason"
            options={ access.general('lists.contactReasons') }
            value={formValues.reason}
            onChange={handleInputChange}
          />
        </TwoCells>
        <TwoCells>
          <TextArea
            id="contactMessage"
            name="contactMessage"
            placeholder="נושא הפנייה"
            value={formValues.contactMessage}
            onChange={handleInputChange}
            required
          />
        </TwoCells>
        <div className="col-span-2 flex justify-center">
          <Button type="submit" disabled={!isFormValid}>שלח</Button>
        </div>
      </div>
    </Form>
  );

  const renderSuccessMessage = () => (
    <Wrapper>
      <Title>בקשתך התקבלה ניצור איתך קשר בהקדם</Title>
    </Wrapper>
  );

  const renderFailureMessage = () => {
    alert('בקשה נכשלה, בבקשה תנסה שוב מאוחר יותר');
    return renderForm(); // Optionally redirect or retry
  };

  return message === 'success' ? renderSuccessMessage() : message === 'failure' ? renderFailureMessage() : renderForm();
};

export default ContactUs;
