import React from "react";
import styled, { css } from 'styled-components';

const RegistraionWrapper = styled.section`
  width: 100%;
  height: 100%;
  
  ${props => css`
    ${props.tailwindClass}
  `}

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
  ${props => css`
    ${props.tailwindClass}
  `}
`;

const InputLabelWrapper = styled.div`
  ${props => css`
    ${props.tailwindClass}
  `}
`;

const Form = styled.div`
  ${props => css`
    ${props.tailwindClass}
  `}
`;

const FormWrapper = styled.div`
  ${props => css`
      ${props.tailwindClass}
  `}
`;

const Register = () => {
  return (
    <RegistraionWrapper tailwindClass="bg-gray-50 dark:bg-gray-900">
      <ItemsWrapper tailwindClass="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <FormWrapper tailwindClass="p-6 space-y-4 md:space-y-6 sm:p-8">
          <Title tailwindClass="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">משתמש חדש</Title>
          <Form tailwindClass="space-y-4 md:space-y-6" action="#">
            <InputLabelWrapper>
              <Label for="pname" tailwindClass="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >שם פרטי</Label>
              <Input type="text" name="pname" id="pname" tailwindClass="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שם פרטי" required=""></Input>
            </InputLabelWrapper>
            <InputLabelWrapper>
              <Label for="lname" tailwindClass="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >שם משפחה</Label>
              <Input type="text" name="lname" id="lname" tailwindClass="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="שם משפחה" required=""></Input>
            </InputLabelWrapper>
            <InputLabelWrapper>
              <Label for="phoneNumber" tailwindClass="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >מספר טלפון נייד</Label>
              <Input type="tel" name="phoneNumber" id="phoneNumber" tailwindClass="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="טלפון" required=""></Input>
            </InputLabelWrapper>
            <InputLabelWrapper>
              <Label for="email" tailwindClass="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >דואר אלקטרוני</Label>
              <Input type="email" name="email" id="email" tailwindClass="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="דואר אלקטרוני" required=""></Input>
            </InputLabelWrapper>
            <InputLabelWrapper>
              <Label for="password" tailwindClass="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >סיסמה</Label>
              <Input type="password" name="pname" id="pname" tailwindClass="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="סיסמה" required=""></Input>
            </InputLabelWrapper>
            <InputLabelWrapper>
              <Label for="rePassword" tailwindClass="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >אישור סיסמה</Label>
              <Input type="rePassword" name="rePassword" id="rePassword" tailwindClass="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="סיסמה" required=""></Input>
            </InputLabelWrapper>
          </Form>
        </FormWrapper>
      </ItemsWrapper>
    </RegistraionWrapper>
  );
};

export default Register;
