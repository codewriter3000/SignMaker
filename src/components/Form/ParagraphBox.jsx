import React from 'react';

const ParagraphBox = ({ label, defaultValue = "", onChange }) => {
    return (
        <div>
            <label htmlFor="paragraph">{label}</label>
            <textarea
                id="paragraph"
                name="paragraph"
                rows="4"
                cols="50"
                defaultValue={defaultValue}
                onChange={onChange}
            ></textarea>
        </div>
    );
};

export default ParagraphBox;