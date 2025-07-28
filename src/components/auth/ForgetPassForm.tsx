import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useAuth } from '../../context/AuthContext';
import Alert from '../ui/alert/Alert';

export default function ForgetPassForm() {
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';
  const { resetPassword, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    await resetPassword(email);
    if (!error) setSuccess(true);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className='mb-2 font-bold uppercase text-brand-500 text-title-sm dark:text-white/90 sm:text-title-md text-left'>
              {t('forgotPassword')}
            </h1>
            <p className='text-md capitalize text-gray-500 dark:text-gray-400 text-left'>
              {t('forgotPasswordMessage')}
            </p>
          </div>
          <div>
            {error && (
              <div className="mb-4">
                <Alert variant="error" title={t('error')} message={error} />
              </div>
            )}
            {success && !error && (
              <div className="mb-4">
                <Alert variant="success" title={t('success')} message={t('passwordResetSent')} />
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label className='text-left'>
                    {t('email')} <span className="text-error-500">*</span>
                  </Label>
                  <Input 
                    placeholder={t('enterEmail')} 
                    className='text-left'
                    dir={isRTL ? 'rtl' : 'ltr'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit" disabled={loading}>
                    {loading ? t('loading') : t('sendResetLink')}
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
