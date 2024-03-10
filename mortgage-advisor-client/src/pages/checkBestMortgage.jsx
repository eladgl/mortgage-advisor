import React, { useEffect, useState } from "react";

import styled from 'styled-components';

import Select from "../components/select";
import { ImportantLabel, Label } from "../components/label";
import { Input } from "../components/input";
import RangeSlider from "../components/rangeSlider";
import { TailWindLink } from "../components/link";
import { Button } from "../components/button";

const Wrapper = styled.div`
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid black;
  background-color: white;
  border-radius: 1rem;
  height: 100%;

  @media (min-width: 640px) {
    padding: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const HorizontalWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const citizenships = ['ישראלית', 'אמריקאית', 'אירופאית'];
const property = ['נכס חדש', 'נכס משופץ', 'נכס בבנייה'];

const GridCell = styled.div`
    
`;

const CustomLink = styled(TailWindLink)`
    margin-right: 8px;
`;

const ChosenTitles = styled.h1`
    font-size: 25px;
    font-weight: 700;
    color: green;
`;

const TwoCells = styled(GridCell)`
    grid-column: span 2;
`;


const CheckBestMortgage = () => {
    const [formValues, setFormValues] = useState({
        bankName: '',
        loanAmount: 0,
        property: '',
        citizenship: '',
        agreement: false
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const isFormValid =
            formValues.bankName !== '' &&
            formValues.loanAmount > 0 &&
            formValues.property !== '' &&
            formValues.citizenship !== '' &&
            formValues.agreement;

        setIsFormValid(isFormValid);
    }, [formValues]);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormValues({ ...formValues, [name]: newValue });
    };
    

    const renderGrid = () => {
        return (
            <div className="grid grid-cols-2 grid-rows-5 gap-8 content-around">
                <GridCell>
                    <ImportantLabel htmlFor="property">אני מעוניין לקחת משכנתא עבור</ImportantLabel>
                    <Select 
                        id="property" 
                        name="property" 
                        options={ property } 
                        value={ formValues.property }
                        handleSelectChange={ handleInputChange } />
                </GridCell>
                <GridCell>
                    <ImportantLabel htmlFor="bankName">שם בנק שבו מתהל חשבונך</ImportantLabel>
                    <Input
                        type="text"
                        name="bankName"
                        id="bankName"
                        placeholder="לחץ כדי לבחור"
                        value={formValues.bankName}
                        onChange={handleInputChange}
                        required />
                </GridCell>
                <GridCell>
                    <ImportantLabel htmlFor="loanAmount">כמה כסף אתה מעוניין להלוות? [בש"ח]</ImportantLabel>
                    <RangeSlider
                        id="loanAmount"
                        name="loanAmount"
                        minValue={ 0 }
                        maxValue={ 100 }
                        value={ formValues.loanAmount }
                        handleRangeChange={ handleInputChange }
                        onChange={(value) => setFormValues({ ...formValues, loanAmount: value })} />
                </GridCell>
                
                <GridCell>
                    <ImportantLabel htmlFor="citizenship">אזרחות נוכחית</ImportantLabel>
                    <Select 
                        id="citizenship" 
                        name="citizenship" 
                        options={citizenships} 
                        value={formValues.citizenship}
                        handleSelectChange={ handleInputChange } />
                </GridCell>

                <TwoCells></TwoCells>
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
                                className="sr-only peer" checked={formValues.agreement}
                                onChange={handleInputChange} />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </Label>
                        <CustomLink 
                            href="https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf" 
                            target="_blank" >תקנון
                        </CustomLink>
                    </HorizontalWrapper>
                </GridCell>
                <GridCell />
                <GridCell>
                    <Button type="submit" disabled={!isFormValid}>חשב</Button>
                </GridCell>
            </div>
        );
    };

    return (

        <Wrapper>
            <h3>מעוניין לקחת הלוואה רגילה</h3>
            <h3>מעוניין לקחת הלוואה עד 100 אלף ש"ח</h3>
            <ChosenTitles>אני מעוניין לקחת הלוואה אחת</ChosenTitles>
            {renderGrid()}
        </Wrapper>
    );
};

export default CheckBestMortgage;