import React from 'react';

import styled from 'styled-components';

// const NoArrowSelect = styled.select`
//     -webkit-appearance: none;
//     -moz-appearance: none;
//     &::-ms-expand {
//         display: none;
//     }
// `;

const SvgArrow = styled.svg`
    position: absolute;
    top: 5px;
    left: 0;
`;

const SelectWrapper = styled.div`
    position: relative;  
    width: fit-content;
`;

const Select = ({ options }) => {
    const renderOptions = options.map((opt) => (
        <option key={opt}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                { opt }
        </option>
    ));

    return (
        <SelectWrapper id="dropdown">
            <select className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" aria-labelledby="dropdownDefaultButton">
                {renderOptions}
            </select>

            {/* <SvgArrow
                className={`w-3.5 h-3.5 ms-3 transform rotate-180`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </SvgArrow> */}
        </SelectWrapper>
    );
};

export default Select;
