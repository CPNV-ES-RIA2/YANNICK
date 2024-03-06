import React, { createContext, useState, useContext, useEffect } from 'react';
import translationsData from '../languages/languages.json';


const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(localStorage.getItem('language') || navigator.language.slice(0, 2));
    const [translations, setTranslations] = useState({});

    useEffect(() => {
        const currentTranslations = translationsData[language] || translationsData['en'];
        setTranslations(currentTranslations);
        localStorage.setItem('language', language);
    }, [language]);

    const handleLanguageChange = (language) => {
        setLanguage(language);
    };

    return (
        <LanguageContext.Provider value={{ language, translations, handleLanguageChange }}>
            {children}
        </LanguageContext.Provider>
    );
};
