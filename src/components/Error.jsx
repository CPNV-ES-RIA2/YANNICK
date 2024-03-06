import React from 'react';
import { useLanguage } from '../providers/languages';
import { useError } from '../providers/errors';

const Error = () => {
    const { translations } = useLanguage();
    const { error, isVisible } = useError();

    if (!isVisible) return null;

    const errorColor = error.success ? 'green' : 'red';
    console.log('errorColor', errorColor);
    return (
        <div className={`error ${isVisible ? 'visible' : 'hidden'}`} style={{ color: errorColor }}>
            <p>{translations[error.message]}</p>
        </div>
    );
};

export default Error;
