import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate} from "react-router-dom";

import Select from "../components/select";
import { ImportantLabel, Label } from "../components/label";
import { Input } from "../components/input";
import RangeSlider from "../components/rangeSlider";
import { TailWindLink } from "../components/link";
import { Button } from "../components/button";
import TailWindTable from "../components/tainWindTable";
import { useAuth } from "../context/AuthContext";
import * as access from "@access";
import config from "../access/configs/config";

const Wrapper = styled.div`
  padding: 1.5rem;
  margin-bottom: 1rem;
  height: 100%;
`;

const HorizontalWrapper = styled.div`
  display: flex;
  align-items: center;
`;


const GridCell = styled.div`
  margin-bottom: 1rem;
`;

const CustomLink = styled(TailWindLink)`
  margin-right: 8px;
`;

const ChosenTitles = styled.h1`
  font-size: 25px;
  font-weight: 700;
  color: green;
`;

const CheckBestMortgage = () => {
  const [calculated, setCalculated] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    bankName: '',
    loanAmount: 0,
    property: '',
    citizenship: '',
    agreement: false
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isFormValid = formValues.bankName !== '' &&
      formValues.loanAmount > 0 &&
      formValues.property !== '' &&
      formValues.citizenship !== '' &&
      formValues.agreement;

    setIsFormValid(isFormValid);
  }, [formValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    if(!user){
      alert('You must login in order to submit, redirecting you to login page..');
      navigate('/login');
      return;
    }
    const checkDetails = {
      userId: user.id,
      userPrivateName: user.pname,
      userLastName: user.lname,
      userEmail: user.email,
      formValues,
    };

    try {
      const response = await axios.post(`http://${config.URL}:3001/storeCheck`, checkDetails);
      console.log(response.data);
      setCalculated(true);
    } catch (error) {
      console.error("Error submitting check:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const renderGrid = () => (
    <div className=" px-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <GridCell>
        <ImportantLabel
          htmlFor="property"
          className="text-center lg:text-right"
        >
          אני מעוניין לקחת משכנתא עבור
        </ImportantLabel>
        <Select
          id="property"
          name="property"
          options={access.general("lists.property")}
          value={formValues.property}
          handleSelectChange={handleInputChange}
        />
      </GridCell>
      <GridCell>
        <ImportantLabel
          htmlFor="bankName"
          className="text-center lg:text-right"
        >
          שם בנק שבו מתהל חשבונך
        </ImportantLabel>
        <Select
          name="bankName"
          id="bankName"
          placeholder="לחץ כדי לבחור"
          options={access.general("lists.bankNames")}
          value={formValues.bankName}
          handleSelectChange={handleInputChange}
          required
        />
      </GridCell>
      <GridCell>
        <ImportantLabel
          htmlFor="loanAmount"
          className="text-center lg:text-right"
        >
          כמה כסף אתה מעוניין להלוות? [בש"ח]
        </ImportantLabel>
        <RangeSlider
          id="loanAmount"
          name="loanAmount"
          minValue={0}
          maxValue={100}
          value={formValues.loanAmount}
          handleRangeChange={handleInputChange}
          onChange={(value) =>
            setFormValues({ ...formValues, loanAmount: value })
          }
        />
      </GridCell>
      <GridCell>
        <ImportantLabel
          htmlFor="citizenship"
          className="text-center lg:text-right"
        >
          אזרחות נוכחית
        </ImportantLabel>
        <Select
          id="citizenship"
          name="citizenship"
          options={access.general("lists.citizenships")}
          value={formValues.citizenship}
          handleSelectChange={handleInputChange}
        />
      </GridCell>
      <GridCell>
      <HorizontalWrapper>
                        <Label style={{ paddingLeft: '5px' }}>
                            קראתי ואני מסכים לתקנון האתר
                        </Label>
                        <Label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id="agreement"
                                name="agreement"
                                value=""
                                className="sr-only peer " checked={formValues.agreement}
                                onChange={handleInputChange} />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700  peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </Label>
                        <CustomLink
                            href="https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
                            target="_blank" >תקנון
                        </CustomLink>
                    </HorizontalWrapper>
      </GridCell>
      <GridCell>
        <Button type="submit" onClick={handleSubmit} disabled={!isFormValid}>
          חשב
        </Button>
      </GridCell>
    </div>
  );

  const renderForm = () => (
    <>
      <h3>מעוניין לקחת הלוואה רגילה</h3>
      <h3>מעוניין לקחת הלוואה עד 100 אלף ש"ח</h3>
      <ChosenTitles className='text-center lg:text-right'>איפה הכי כדאי לי לקחת משכנתא</ChosenTitles>
      {renderGrid()}
    </>
  );

  const renderResult = () => (
    <>
      <p className="pb-10 ">
        הכי כדאי מבחינת עמלות - אופצייה ג'{" "}
        <span style={{ color: 'green' }}>בנק לאומי</span>
      </p>
      <TailWindTable />
      <p className="pt-10">* הערכה בלבד</p>
    </>
  );

  return (
    <Wrapper>
      {calculated ? renderResult() : renderForm()}
    </Wrapper>
  );
};

export default CheckBestMortgage;
