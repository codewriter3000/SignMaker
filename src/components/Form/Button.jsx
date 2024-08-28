import React from 'react';
import PropTypes from 'prop-types';
import { classConcat } from '../../lib';

const Button = ({ text, onClick, variant = 'standard', width = 'full' }) => {

    return (
        <button className={classConcat('m-1 rounded p-1 bg-neutral-200 cursor-pointer duration-500',
        variant === 'danger' ? 'hover:bg-rose-300' : 'hover:bg-neutral-400',
        width === 'full' ? 'w-28' : 'w-14')}
            onClick={(evt) => {
                evt.preventDefault();
                onClick(evt);
            }}
        >
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.oneOf(['standard', 'danger']),
    width: PropTypes.oneOf(['full', 'half'])
};

export default Button;