import React, { useEffect, useState } from 'react';
import { useLanguage } from '../providers/languages';

const Error = ({ message, success = false }) => {
    const { translations } = useLanguage();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, [message]);

    if (!isVisible || !message) return null;


    return (
        <div id="error" style={{ color: success ? 'green' : 'red' }}>
            {translations[message]}
        </div>
    );
};

export default Error;
