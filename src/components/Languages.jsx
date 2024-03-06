import React from 'react'
import { useLanguage } from '../providers/languages';
import translationsData from '../languages/languages.json';

export default function Languages() {
    const { language, translations, handleLanguageChange } = useLanguage();
    return (
        <div>
            <form>
                <label htmlFor="language">{translations.labelLanguage}</label><br />
                <select id="language" value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
                    <option value="en">{translationsData.en.language}</option>
                    <option value="fr">{translationsData.fr.language}</option>
                    <option value="all">{translationsData.all.language}</option>
                </select>
            </form>
        </div>

    )
}
