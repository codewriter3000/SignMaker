import React from 'react';

const Textbox = ({ placeholder, label }) => {
    return (
        <div>
            <label htmlFor="textbox">{label}</label>
            <input type="text" id="textbox" placeholder={placeholder} />
        </div>
    );
};

export default Textbox;