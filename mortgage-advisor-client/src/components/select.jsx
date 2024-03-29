import React, { useState }  from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';

const SelectWrapper = styled.div`
    position: relative;  
`;

const Select = ({ options, handleSelectChange, id, name }) => {
    const [selectedValue, setSelectedValue] = useState('');

    const renderOptions = options.map((opt, index) => (
        <option key={ `${index}-${opt}` } value={ opt}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                { opt }
        </option>
    ));

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        e.preventDefault();
        handleSelectChange(e);
    };

    return (
        <SelectWrapper id="dropdown">
            <select 
                id={ id }
                style={{width: '100%'}}
                name={ name }
                value={selectedValue}
                onChange={ handleChange }
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" aria-labelledby="dropdownDefaultButton">
                <option value='' disabled>לחץ לבחירה</option>
                {renderOptions}
            </select>
        </SelectWrapper>
    );
};

Select.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    handleSelectChange: PropTypes.func,
  };

  Select.defaultProps = {
    id: "",
    name: "",
    handleSelectChange: () => null,
    options: [''],
  };

export default Select;
