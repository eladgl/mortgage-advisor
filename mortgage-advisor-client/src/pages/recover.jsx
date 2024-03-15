import React, { useEffect, useState } from "react";

import styled from "styled-components";

import axios from "axios";

import { ImportantLabel, Label } from "../components/label";
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

const GridCell = styled.div`
    
`;

const TwoCells = styled(GridCell)`
    grid-column: span 2;
`;

const Recover = () => {
    const [formValues, setFormValues] = useState({
        email: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const isFormValid = formValues.email !== '';
        setIsFormValid(isFormValid);
    }, [formValues]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/recover", formValues);
            setMessage("success");
          } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("failure");
          }
    }

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const renderRecover = () => {
        return (
            <form onSubmit={handleSubmit} className="grid grid-cols-3 grid-rows-1 gap-8">
                <TwoCells>
                    <ImportantLabel>דואר אלקטרוני</ImportantLabel>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="דואר אלקטרוני"
                        value={formValues.email}
                        onChange={handleInputChange} />
                </TwoCells>
                <GridCell />
                <GridCell>
                    <Button type="submit" disabled={!isFormValid}>שחזר סיסמה</Button>
                </GridCell>
            </form>
        );
    };

    return (
        <Wrapper>
            {renderRecover()}
        </Wrapper>
    );
};

export default Recover;