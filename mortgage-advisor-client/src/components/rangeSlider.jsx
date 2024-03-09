import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Label } from "../components/label";
import { Input } from "../components/input";

const RangeWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row-reverse;
`;

const RangeInput = styled(Input)`
  direction: ltr;
`;

const Hint = styled.div`
  position: absolute; 
  top: 2.4rem;
  left: ${(props) => `${props.left}%`};
  color: white; 
  border: 1px solid blue; 
  border-radius: 50%;
  background-color: #6d6dfe;
  width: max-content;
  padding: 5px;
  justify-content: center;
  border-radius: 50%;
  border-top-right-radius: 0;
  transform: rotate(-45deg);
`;

const TextInHint = styled.span`
    display: inline-block;
    transform: rotate(45deg);
    font-size: 8px;
    white-space: nowrap;
`;

const RangeSlider = ({ minValue, maxValue }) => {
    const [value, setValue] = useState(0);
    const [hintPosition, setHintPosition] = useState(0);
    const rangeRef = useRef(null);
    const hintRef = useRef(null);

    const handleChange = (event) => {
        const val = parseInt(event.target.value);
        setValue(val);
        updatePosition(val);
    };

    const updatePosition = (val) => {
        if (rangeRef.current && hintRef.current) {
            const clientWidth = rangeRef.current.clientWidth;
            const rangeVal = rangeRef.current.value;
            const offset = (rangeVal - minValue) * (100 / (maxValue - minValue));
            const hintWidth = hintRef.current.offsetWidth;
            const hintOffset = offset - (hintWidth / clientWidth) * offset;
            setHintPosition(hintOffset);
        }
    };

    useEffect(() => {
        updatePosition();
    }, [hintPosition]);

    return (
        <RangeWrapper className="range-slider">
            <Label>{minValue}</Label>
            <RangeInput
                type="range"
                min={minValue}
                max={maxValue}
                ref={rangeRef}
                value={value}
                onChange={handleChange} />
            <Hint ref={hintRef} left={hintPosition}>
                <TextInHint>{`${value}₪`}</TextInHint>
            </Hint>
            <Label>{maxValue}</Label>
        </RangeWrapper>
    );
};

export default RangeSlider;
