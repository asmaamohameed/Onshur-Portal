import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from 'react-i18next';

interface LanguageToggleProps {
  className?: string;
  mobile?: boolean;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '', mobile = false }) => {
  const { language, toggleLanguage, direction } = useLanguage();
  const { t } = useTranslation();

  const isRTL = direction === 'rtl';

  // Mobile version shows only the target language
  if (mobile) {
    return (
      <button
        onClick={toggleLanguage}
        className={`px-3 py-1 text-sm font-medium text-white hover:text-gray-200 transition-colors duration-200 ${className}`}
        aria-label={t('toggleLanguage')}
        title={language === 'en' ? t('switchToArabic') : t('switchToEnglish')}
      >
        {language === 'en' ? 'AR' : 'EN'}
      </button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleLanguage}
        className={`
          group relative flex items-center justify-center px-4 py-2
          bg-brand-800  
          ${isRTL ? 'hover:scale-105' : 'hover:scale-105'}
        `}
        aria-label={t('toggleLanguage')}
        title={language === 'en' ? t('switchToArabic') : t('switchToEnglish')}
      >
        {/* Language Toggle Display */}
        <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'}`}>
          {/* English Option */}
          <span
            className={`
              text-sm font-medium transition-all duration-300
              ${language === 'en' 
                ? 'text-brand-500' 
                : 'text-gray-400'
              }
            `}
          >
            EN
          </span>
          
          {/* Toggle Separator */}
          <div className="w-px h-4 bg-gray-300"></div>
          
          {/* Arabic Option */}
          <span
            className={`
              text-sm font-medium transition-all duration-300
              ${language === 'ar' 
                ? 'text-brand-500' 
                : 'text-gray-400'
              }
            `}
          >
            AR 
          </span>
        </div>
      </button>

      {/* Tooltip */}
      <div
        className={`
          absolute top-full mt-2 px-3 py-1 
          bg-gray-900 dark:bg-gray-700 text-white text-xs 
          rounded-md opacity-0 group-hover:opacity-100 
          transition-opacity duration-300 pointer-events-none
          whitespace-nowrap z-50
          ${isRTL ? 'right-0' : 'left-0'}
        `}
      >
        {language === 'en' ? t('switchToArabic') : t('switchToEnglish')}
        <div
          className={`
            absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 
            transform rotate-45 -top-1
            ${isRTL ? 'right-3' : 'left-3'}
          `}
        />
      </div>
    </div>
  );
};

export default LanguageToggle; 