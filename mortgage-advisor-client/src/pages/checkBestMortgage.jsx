import React, { useEffect, useState } from "react";

import styled from 'styled-components';

import Select from "../components/select";
import { ImportantLabel, Label } from "../components/label";
import { Input } from "../components/input";
import RangeSlider from "../components/rangeSlider";
import { TailWindLink } from "../components/link";
import { Button } from "../components/button";
import TailWindTable from "../components/tainWindTable";

import * as access from "@access";

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

const HorizontalWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

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
    const [calculated, setCalculated] = useState(false);

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

    const handleClick = () => {
        isFormValid && setCalculated(true);
    };

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
                        options={ access.general('lists.property') }
                        value={formValues.property}
                        handleSelectChange={handleInputChange} />
                </GridCell>
                <GridCell>
                    <ImportantLabel htmlFor="bankName">שם בנק שבו מתהל חשבונך</ImportantLabel>
                    <Select
                        name="bankName"
                        id="bankName"
                        placeholder="לחץ כדי לבחור"
                        options={ access.general('lists.bankNames') } 
                        value={formValues.bankName}
                        handleSelectChange={ handleInputChange }
                        required />
                </GridCell>
                <GridCell>
                    <ImportantLabel htmlFor="loanAmount">כמה כסף אתה מעוניין להלוות? [בש"ח]</ImportantLabel>
                    <RangeSlider
                        id="loanAmount"
                        name="loanAmount"
                        minValue={0}
                        maxValue={100}
                        value={formValues.loanAmount}
                        handleRangeChange={handleInputChange}
                        onChange={(value) => setFormValues({ ...formValues, loanAmount: value })} />
                </GridCell>

                <GridCell>
                    <ImportantLabel htmlFor="citizenship">אזרחות נוכחית</ImportantLabel>
                    <Select
                        id="citizenship"
                        name="citizenship"
                        options={ access.general('lists.citizenships') }
                        value={formValues.citizenship}
                        handleSelectChange={handleInputChange} />
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
                    <Button type="submit" disabled={!isFormValid} onClick={handleClick}>חשב</Button>
                </GridCell>
            </div>
        );
    };

    const renderForm = () => (
        <>
            <h3>מעוניין לקחת הלוואה רגילה</h3>
            <h3>מעוניין לקחת הלוואה עד 100 אלף ש"ח</h3>
            <ChosenTitles>אני מעוניין לקחת הלוואה אחת</ChosenTitles>
            {renderGrid()}
        </>
    )

    const renderResult = () => {
        return (
            <>
                <p className="pb-10">
                    הכי כדאי מבחינת עמלות - אופצייה ג'{" "}
                    <span style={{ color: 'green' }}>בנק לאומי</span>
                </p>
                <TailWindTable />
                <p className="pt-10">* הערכה בלבד</p>
            </>
        );
    }

    return (

        <Wrapper>
            {calculated ? renderResult() : renderForm()}

        </Wrapper>
    );
};

export default CheckBestMortgage;