import React from "react";

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
const payBackMethod = ['ריבית פריים', 'ריבית קבועה צמודה למדד', 'ריבית קבועה לא צמודה'];

const GridCell = styled.div`
    
`;

const CustomLink = styled(TailWindLink)`
    margin-right: 8px; /* Add some margin between the checkbox and the link */
`;

const NormalMortgage = () => {

    const renderGrid = () => {

        return (
            <div className="grid grid-cols-2 grid-rows-6 gap-6">
                <GridCell>
                    <ImportantLabel>שם בנק שבו מתהל חשבונך</ImportantLabel>
                    <Input
                        type="text"
                        name="bankNaame"
                        id="bankName"
                        placeholder="לחץ כדי לבחור"
                        required />
                </GridCell>
                <GridCell>
                    <ImportantLabel>כמה כסף אתה מעוניין להלוות? [בש"ח]</ImportantLabel>
                    <RangeSlider minValue={0} maxValue={100} />
                </GridCell>
                <GridCell>
                    <ImportantLabel>בחר שיטת החזר רצויה</ImportantLabel>
                    <Select id="citizenship" name="citizenship" options={payBackMethod} />
                </GridCell>
                <GridCell>
                    <Label>אזרחות נוכחית</Label>
                    <Select id="citizenship" name="citizenship" options={citizenships} />
                </GridCell>
                <GridCell>
                    <HorizontalWrapper>
                        <Label>ידוע לי שההצעה היא רק לאומדן בלבד</Label>
                        <Input type="checkbox" id="acknowledge" name="acknowledge" />
                    </HorizontalWrapper>
                </GridCell>
                <GridCell></GridCell>
                <GridCell>
                    <HorizontalWrapper>
                        <Label>קראתי ואני מסכים לתקנון האתר</Label>
                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                        <CustomLink href="https://www.yad2.co.il/eula" target="_blank">תקנון</CustomLink>
                    </HorizontalWrapper>
                </GridCell>
                <GridCell />
                <GridCell>
                    <Button type="submit">חשב</Button>
                </GridCell>
            </div>
        );
    };

    return (
        <Wrapper>
            {renderGrid()}
        </Wrapper>
    );
};

export default NormalMortgage;