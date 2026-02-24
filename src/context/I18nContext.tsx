import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { PT } from '../locales/pt';
import type { TranslationKeys } from '../locales/pt';
import { EN } from '../locales/en';

type Language = 'pt' | 'en';

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKeys) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'pt';

    const saved = localStorage.getItem('app_language');
    if (saved === 'pt' || saved === 'en') {
        return saved;
    }

    return 'pt';
};

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(getInitialLanguage);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('app_language', lang);
    };

    const t = (key: TranslationKeys): string => {
        const dictionary = language === 'pt' ? PT : EN;
        return dictionary[key] || key;
    };

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useTranslation must be used within an I18nProvider');
    }
    return context;
};
