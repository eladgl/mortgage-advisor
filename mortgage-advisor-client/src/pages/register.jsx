import React from "react";
import styled, { css } from 'styled-components';

import { Label, ImportantLabel } from '../components/label';
import { Input } from '../components/input';
import { HtmlForm } from '../components/form';
import { TailWindLink } from '../components/link';
import { Button } from '../components/button';

const RegistraionWrapper = styled.section`
  width: 100%;
  height: 100%;
  
  background-color: rgba(0, 0, 0, 0.4);
  .dark {
    background-color: #111827;
  }
`;

const ItemsWrapper = styled.div`
  ${props => css`
    ${props.tailwindClass}
  `}

`;

const Label = styled.label`
  ${props => css`
    ${props.tailwindClass}
  `}
`;

const Input = styled.input`
  ${props => css`
    ${props.tailwindClass}
  `}
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.025em;
  color: #1f2937;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }

  .dark & {
    color: #ffffff;
  }
`;

const InputLabelWrapper = styled.div`

`;

const HtmlFormWrapper = styled.div`
  padding: 1.5rem;
  padding-top: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid black;
  background-color: white;
  border-radius: 1rem;

  @media (min-width: 640px) {
    padding: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 768px) {
    margin-top: 2.25rem;
    margin-bottom: 2.25rem;
  }
`;

const Register = () => {
  return (
    <RegistraionWrapper>
      <ItemsWrapper>
        <HtmlFormWrapper>
          <Title>משתמש חדש</Title>
          <HtmlForm action="#">
            <InputLabelWrapper>
              <ImportantLabel htmlFor="pname" >שם פרטי</ImportantLabel>
              <Input type="text" name="pname" id="pname" placeholder="שם פרטי" required=""></Input>
            </InputLabelWrapper>
            <InputLabelWrapper>
              <ImportantLabel htmlFor="lname" >שם משפחה</ImportantLabel>
              <Input type="text" name="lname" id="lname" placeholder="שם משפחה" required=""></Input>
            </InputLabelWrapper>
            <InputLabelWrapper>
              <ImportantLabel htmlFor="phoneNumber">מספר טלפון נייד</ImportantLabel>
              <Input type="tel" name="phoneNumber" id="phoneNumber" placeholder="טלפון" required=""></Input>
            </InputLabelWrapper>
            <InputLabelWrapper>
              <ImportantLabel htmlFor="email" >דואר אלקטרוני</ImportantLabel>
              <Input type="email" name="email" id="email" placeholder="דואר אלקטרוני" required=""></Input>
            </InputLabelWrapper>
            <InputLabelWrapper>
              <ImportantLabel htmlFor="password">סיסמה</ImportantLabel>
              <Input type="password" name="password" id="password" placeholder="סיסמה" required=""></Input>
            </InputLabelWrapper>
            <InputLabelWrapper>
              <ImportantLabel htmlFor="rePassword">אישור סיסמה</ImportantLabel>
              <Input type="password" name="password" id="rePassword" placeholder="סיסמה" required=""></Input>
            </InputLabelWrapper>

            <Button type="submit">יצירת חשבון</Button>
            <Label>
                כבר יש חשבון? <TailWindLink href="/login">התחברות</TailWindLink>
            </Label>
          </HtmlForm>
        </HtmlFormWrapper>
      </ItemsWrapper>
    </RegistraionWrapper>
  );
};

export default Register;
