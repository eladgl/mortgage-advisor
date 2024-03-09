import React from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components';

import { ImportantLabel, Label } from "../components/label";

const TextAreaWrapper = styled.div`
    position: relative;  
`;

const TextArea = ({ handleTextAreaChange, id, name, required, labelText }) => {
    const renderLabel = () => (
        required ? <ImportantLabel for={name}>{labelText}</ImportantLabel> 
                 : <Label for={name}>{labelText}</Label>
    );

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        e.preventDefault();
        handleChange(e);
    };

    return (
        <TextAreaWrapper id="textArea">
            { renderLabel() }
            <textarea
                id={id}
                name={name}
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="נושא הפנייה"
                onChange={handleTextAreaChange}>
            </textarea>
        </TextAreaWrapper>
    );
};

TextArea.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    handleTextAreaChange: PropTypes.func,
    required: PropTypes.bool,
    labelText: PropTypes.string,
};

TextArea.defaultProps = {
    id: "",
    name: "",
    handleChange: () => null,
    required: false,
    labelText: "",
};

export default TextArea;
