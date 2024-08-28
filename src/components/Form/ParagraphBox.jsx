import React from 'react';

const ParagraphBox = ({ label }) => {
    return (
        <div>
            <label htmlFor="paragraph">{label}</label>
            <textarea id="paragraph" name="paragraph" rows="4" cols="50"></textarea>
        </div>
    );
};

export default ParagraphBox;