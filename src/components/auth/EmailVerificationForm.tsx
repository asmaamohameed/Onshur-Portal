import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
import Button from "../ui/button/Button";
import { useState, useEffect } from "react";

export default function EmailVerificationForm() {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(59);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendDisabled(false);
    }
  }, [timeLeft]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleResend = () => {
    setTimeLeft(59);
    setIsResendDisabled(true);
    // Add your resend logic here
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-lg mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className='mb-2 font-bold uppercase text-brand-500 text-title-sm dark:text-white/90 sm:text-title-md text-left'>
              {t('emailVerification')}
            </h1>
            <p className='text-md capitalize text-gray-500 dark:text-gray-400 text-left'>
              {t('emailVerificationMessage')}
            </p>
          </div>
          <div>
            <form>
              <div className="space-y-6">
                <div>
                  <div className={`flex justify-center space-x-4 ${isRTL ? 'space-x-reverse ' : ''} mt-2`}>
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        className="w-12 h-12 text-center text-lg font-semibold border-2 border-brand-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-white"
                        placeholder=""
                        // dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    ))}
                  </div>
                  <div className='text-left mt-4 '>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isResendDisabled}
                      className={`text-brand-500 text-sm ${
                        isResendDisabled 
                          ? 'opacity-50 cursor-not-allowed' 
                          : 'hover:text-brand-600 cursor-pointer'
                      }`}
                    >
                      {isResendDisabled 
                        ? `${t('retryAfter')} 0:${timeLeft.toString().padStart(2, '0')}` 
                        : t('resendCode')
                      }
                    </button>
                  </div>
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    {t('verifyButton')}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
