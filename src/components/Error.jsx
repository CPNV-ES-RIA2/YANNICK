import React from 'react';
import { useLanguage } from '../providers/languages';
import { useError } from '../providers/errors';

const Error = () => {
    const { translations } = useLanguage();
    const { error, isVisible } = useError();

    if (!isVisible) return null;

    const errorColor = error.success ? 'green' : 'red';
    return (
        <div className={`error ${isVisible ? 'visible' : 'hidden'}`} style={{ color: errorColor }} id='error'>
            <p>{translations[error.message]}</p>
        </div>
    );
};

export default Error;
