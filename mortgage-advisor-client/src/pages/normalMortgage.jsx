import React from "react";

import styled from 'styled-components';

import Select from "../components/select";
import { ImportantLabel, Label } from "../components/label";
import { Input } from "../components/input";
import RangeSlider from "../components/rangeSlider";

const Wrapper = styled.div`
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid black;
  background-color: white;
  border-radius: 1rem;

  @media (min-width: 640px) {
    padding: 2rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const citizenships = ['ישראלית', 'אמריקאית', 'אירופאית'];
const payBackMethod = ['ריבית פריים', 'ריבית קבועה צמודה למדד', 'ריבית קבועה לא צמודה'];

const GridCell = styled.div`
    
`;

const NormalMortgage = () => {
    
    const renderGrid = () => {

        return (
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <GridCell>
                    <ImportantLabel>שם בנק שבו מתהל חשבונך</ImportantLabel>
                    <Input
                        type="text"
                        name="bankNaame"
                        id="bankName"
                        placeholder="לחץ כדי לבחור"
                        required/>
                </GridCell>
                <GridCell>
                    <ImportantLabel>כמה כסף אתה מעוניין להלוות? [בש"ח]</ImportantLabel>
                    <RangeSlider minValue={ 0 } maxValue={ 100 }/>
                </GridCell>
                <GridCell>
                    <ImportantLabel>בחר שיטת החזר רצויה</ImportantLabel>
                    <Select id="citizenship" name="citizenship" options={payBackMethod} />
                </GridCell>
                <GridCell>
                    <Label>אזרחות נוכחית</Label>
                    <Select id="citizenship" name="citizenship" options={citizenships} />
                </GridCell>
            </div>
        );
    };

    return (
        <Wrapper>
            {renderGrid()}
        </Wrapper>
    );

    //return <Select options={["ישראלית", "אמריקאית"]} />
};

export default NormalMortgage;