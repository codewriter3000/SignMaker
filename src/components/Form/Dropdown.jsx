import React from 'react';

const Dropdown = ({ label = '', options, onChange }) => {
    const handleChange = (event) => {
        event.preventDefault();
        const selectedValue = event.target.value;
        onChange(selectedValue);
    };

    return (
        <div>
            <label>{label}</label>
            <select onChange={handleChange}>
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;