import React from 'react';

import styled from 'styled-components';

const SvgArrow = styled.svg`
    position: absolute;
    top: 5px;
    left: 0;
`;

const SelectWrapper = styled.div`
    position: relative;  
    width: fit-content;
`;

const Select = ({ options, handleSelectChange, id, name }) => {
    const renderOptions = options.map((opt, index) => (
        <option key={ `${index}-${opt}` } value={ opt}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                { opt }
        </option>
    ));

    const handleChange = (e) => {
        e.preventDefault();
        handleSelectChange(e);
    };

    return (
        <SelectWrapper id="dropdown">
            <select 
                id={ id }
                name={ name }
                onChange={ handleChange }
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" aria-labelledby="dropdownDefaultButton">
                <option value='' selected disabled>לחץ לבחירה</option>
                {renderOptions}
            </select>
        </SelectWrapper>
    );
};

export default Select;
