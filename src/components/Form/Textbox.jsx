import React from 'react';

const Textbox = ({ placeholder, label, onChange }) => {
    return (
        <div>
            <label htmlFor="textbox">{label}</label>
            <input
                type="text"
                id="textbox"
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
};

export default Textbox;
