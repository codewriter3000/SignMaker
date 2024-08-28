import React from 'react';

const NumberBox = ({ min, max }) => {
    const handleChange = (event) => {
        // Handle the number input change here
        const value = event.target.value;
        // Add your logic to handle the value within the min and max range
    };

    return (
        <input type="number" min={min} max={max} onChange={handleChange} />
    );
};

export default NumberBox;