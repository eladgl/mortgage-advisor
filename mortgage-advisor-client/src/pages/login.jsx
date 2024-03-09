import React, { useState } from "react";
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
`;

const GridCell = styled.div`
    
`;

const TwoCells = styled(GridCell)`
    grid-column: span 2;
`;

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/login", formValues);
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 grid-rows-1 gap-8">
        <TwoCells>
        <Label htmlFor="email">דואר אלקטרוני:</Label>
        <Input
          type="email"
          placeholder="דואר אלקטרוני"
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          required
        />
        </TwoCells>
        <TwoCells>
        <Label htmlFor="password">סיסמה:</Label>
        <Input
          type="password"
          placeholder="סיסמה"
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          required
        />
        </TwoCells>
        <GridCell>
        <Button type="submit">כניסה</Button>
        </GridCell>
      </form>
    </Wrapper>
  );
};

export default Login;
