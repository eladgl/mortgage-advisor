import React, { useEffect, useState } from "react";

import styled from "styled-components";

import axios from "axios";

import { ImportantLabel, Label } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";
import Select from "../components/select";
import TextArea from "../components/textArea";
import { Title } from "../components/Title";

import * as access from "@access";

const Wrapper = styled.div`
  padding: 1.5rem;
  margin-bottom: 1rem;
  padding-top: 1rem;

  border: 1px solid black;
  background-color: white;
  border-radius: 1rem;
  height: 100%;

  @media (min-width: 640px) {
    padding: 2rem 2rem;
    margin-top:  0 2rem;;
    margin-bottom:  0 2rem;;
  }
`;

const GridCell = styled.div`
    
`;

const TwoCells = styled(GridCell)`
    grid-column: span 2;
`;

const ContactUs = () => {
  const [message, setMessage] = useState('0');

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
    const isFormValid =
      formValues.fname !== '' &&
      formValues.lname !== '' &&
      formValues.phone !== '' &&
      formValues.email !== '' &&
      formValues.reason !== '' &&
      formValues.contactMessage !== '';

    setIsFormValid(isFormValid);
  }, [formValues]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/contactUs", formValues);
      setMessage("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("failure");
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    // Function to fetch data from server using axios
    const fetchData = async () => {
      try {
        // Make a GET request to the server using axios
        const response = await axios.get("http://localhost:3001/test");
        console.log(response.data.message); // Access data directly from axios response
      } catch (error) {
        console.error("Error fetching data: ", error);
        console.log("Failed to connect to server");
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on component mount
  // Empty array means this effect runs once on mount

  const renderGrid = () => {
    return (
      <div className="grid grid-cols-2 grid-rows-4 gap-4">
        <GridCell>
          <ImportantLabel htmlFor="fname">שם פרטי</ImportantLabel>
          <Input
            type="text"
            name="fname"
            id="fname"
            placeholder="שם פרטי"
            value={formValues.fname}
            onChange={handleInputChange}
            required />
        </GridCell>
        <GridCell>
          <ImportantLabel htmlFor="lname">שם משפחה</ImportantLabel>
          <Input
            type="text"
            id="lname"
            name="lname"
            placeholder="שם משפחה"
            value={formValues.lname}
            onChange={handleInputChange} />
        </GridCell>
        <GridCell>
          <ImportantLabel htmlFor="phone">מספר טלפון נייד</ImportantLabel>
          <Input
            type="tel"
            id="phone"
            name="phone"
            placeholder="טלפון"
            value={formValues.phone}
            onChange={handleInputChange} />
        </GridCell>
        <GridCell>
          <ImportantLabel htmlFor="email">דואר אלקטרוני</ImportantLabel>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="דואר אלקטרוני"
            value={formValues.email}
            onChange={handleInputChange} />
        </GridCell>
        <TwoCells>
          <ImportantLabel>נושא הפנייה</ImportantLabel>
          <Select
            id="reason"
            name="reason"
            options={ access.general('lists.contactReasons') }
            value={formValues.reason}
            handleSelectChange={handleInputChange} />
        </TwoCells>
        <TwoCells>
          <TextArea
            labelText="נושא הפנייה"
            required
            id="contactMessage"
            name="contactMessage"
            value={formValues.contactMessage}
            handleTextAreaChange={handleInputChange} />
        </TwoCells>
        <div className="col-span-2 flex justify-center">
        <Button type="submit" disabled={!isFormValid} className="mt-4">שלח</Button>
      </div>
      </div>
    );
  };


  if (message === 'success')
    return (
      <Wrapper >
        <Title>בקשתך התקבלה ניצור איתך קשר בהקדם</Title>
      </Wrapper>
    );
  else {
    if (message === 'failure') {
      alert('בקשה נכשלה, בבקשה תנסה שוב מאוחר יותר');
    }
    return (
      <Wrapper>
        <Title>טופס יצירת קשר</Title>
        <form onSubmit={handleSubmit}>
          {renderGrid()}
        </form>
      </Wrapper>
    );
  }
};

export default ContactUs;
