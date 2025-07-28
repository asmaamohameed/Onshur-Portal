import React from "react";
import LanguageToggle from "../../components/common/LanguageToggle";
import { useLanguage } from "../../context/LanguageContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';

  return (
    <div className="relative bg-brand-800 z-1 overflow-hidden auth-layout">
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col h-screen">
        {/* Top Section with Logo */}
        <div className="relative bg-[#2A009E] bg-[url('/images/logo/Texture.png')] bg-cover bg-no-repeat h-40 flex items-center justify-center">
          {/* Language Toggle - Top Corner */}
          <div className={`absolute top-6 z-50 ${isRTL ? 'left-6' : 'right-6'} max-w-fit`}>
            <LanguageToggle mobile={true} />
          </div>
          
          {/* Centered Logo */}
          <img
            src="/images/logo/auth-logo.svg"
            alt="Logo"
            className="w-100 h-auto"
          />
        </div>
        
        {/* Bottom Section with Form */}
        <div className="flex-1 bg-brand-800 p-6 flex items-center h-full justify-center">
          {children}
        </div>
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden lg:block relative w-full h-screen grid grid-cols-2">
        {/* Language Toggle - Top Right Corner for Desktop */}
        <div className={`absolute top-6 z-50 ${isRTL ? 'left-6' : 'right-6'} max-w-fit`}>
          <LanguageToggle />
        </div>
        
        <div className="relative w-full h-screen grid grid-cols-1 lg:grid-cols-2 sm:p-0">
        <div className="hidden lg:flex w-full h-full items-center justify-center bg-[#2A009E] bg-[url('/images/logo/Texture.png')] bg-cover bg-no-repeat">
          <img
            src="/images/logo/auth-logo.svg"
            alt="Logo"
            className="w-full h-auto"
          />
        </div>
        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
      </div>
    </div>
  );
}