import React, { createContext, useState, useContext, useEffect } from 'react';

const ResultContext = createContext();
export const useResults = () => useContext(ResultContext);
export const ResultsProvider = ({ children }) => {
    const [results, setResults] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (results) {
            setIsLoading(false);
        }
    }, [results]);


    return (
        <ResultContext.Provider value={{ results, setResults, isLoading, setIsLoading }}>
            {children}
        </ResultContext.Provider>
    );
}

