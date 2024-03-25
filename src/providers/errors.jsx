import React, { createContext, useState, useContext, useEffect } from 'react';

const ErrorContext = createContext();
export const useError = () => useContext(ErrorContext);

 export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState({ message: '', success: false });
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (error.message) {
            setIsVisible(true);
            const timer = setTimeout(() => setIsVisible(false), 10000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const resetError = () => setError({ message: '', success: false });

    return (
        <ErrorContext.Provider value={{ error, setError, resetError, isVisible }}>
            {children}
        </ErrorContext.Provider>
    );
}

export default ErrorProvider;
