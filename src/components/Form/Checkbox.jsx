import React from 'react';

const Checkbox = ({ label, value, onChange }) => {
    return (
        <div>
            <label>{label}{" "}</label>
                <input
                    type="checkbox"
                    checked={value}
                    onChange={onChange}
                />
        </div>
    );
};

export default Checkbox;