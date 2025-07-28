import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  language: string;
  direction: 'ltr' | 'rtl';
  toggleLanguage: () => void;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  const [direction, setDirection] = useState<'ltr' | 'rtl'>(language === 'ar' ? 'rtl' : 'ltr');

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    const newDirection = lang === 'ar' ? 'rtl' : 'ltr';
    setDirection(newDirection);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction and attributes
    document.documentElement.dir = newDirection;
    document.documentElement.lang = lang;
    
    // Add/remove RTL class for Tailwind CSS
    if (newDirection === 'rtl') {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  };

  useEffect(() => {
    // Initialize language on mount
    setLanguage(language);
  }, []);

  const value: LanguageContextType = {
    language,
    direction,
    toggleLanguage,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 