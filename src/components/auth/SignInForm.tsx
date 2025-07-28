import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
import { Icon } from "../common/Icon";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { FaGoogle, FaXTwitter, FaMicrosoft } from "react-icons/fa6";
import { useAuth } from '../../context/AuthContext';
import Alert from '../ui/alert/Alert';

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';
  const { signIn, loading, error, signInWithGoogle, signInWithX, signInWithMicrosoft } = useAuth();
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password, false);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className='mb-2 font-bold uppercase text-brand-500 text-title-sm dark:text-white/90 sm:text-title-md text-left'>
              {t('welcomeBack')}
            </h1>
            <p className={`text-md capitalize text-gray-500 dark:text-gray-400 text-left}`}> 
              {t('loginToAccount')}
            </p>
          </div>
          <div>
            {error && (
              <div className="mb-4">
                <Alert variant="error" title={t('error')} message={error} />
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
                  <Label className='text-left'>
                    {t('password')} <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t('enterPassword')}
                      className='text-left pr-12'
                      dir={isRTL ? 'rtl' : 'ltr'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute z-30 -translate-y-1/2 top-1/2 right-4 text-gray-500 hover:text-gray-700 focus:outline-none'
                    >
                      {showPassword ? (
                        <Icon name="FaEye" className="size-5" />
                      ) : (
                        <Icon name="FaEyeSlash" className="size-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <Link
                    to="/forget-password"
                    className="text-sm text-brand-500 hover:text-brand-600"
                  >
                    {t('forgotPasswordLink')}
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm" type="submit" disabled={loading}>
                    {loading ? t('loading') : t('loginButton')}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className={`text-sm font-normal text-gray-700 dark:text-gray-400 ${isRTL ? 'text-left' : 'text-center sm:text-start'}`}>
                {t('dontHaveAccount')} {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  {t('signUp')}
                </Link>
              </p>
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="text-brand-500 bg-brand-800 sm:px-5 sm:py-2">
                  {t('orLoginWith')}
                </span>
              </div>
            </div>
            {/* Social sign up buttons */}
            <div className="flex justify-center items-center gap-x-5">
              <button
                className="w-12 h-12 flex items-center justify-center transition hover:scale-120"
                onClick={async () => {
                  if (socialLoading) return;
                  setSocialLoading('google');
                  await signInWithGoogle();
                  setSocialLoading(null);
                }}
                disabled={!!socialLoading}
                aria-label="Sign in with Google"
              >
                {socialLoading === 'google' ? (
                  <Icon set="fa" name="FaSpinner" className="animate-spin text-[#5B4FC9] size-7" />
                ) : (
                  <FaGoogle size={28} className="text-[#5B4FC9]" />
                )}
              </button>
              <button
                className="w-12 h-12 flex items-center justify-center transition hover:scale-120"
                onClick={async () => {
                  if (socialLoading) return;
                  setSocialLoading('x');
                  await signInWithX();
                  setSocialLoading(null);
                }}
                disabled={!!socialLoading}
                aria-label="Sign in with X"
              >
                {socialLoading === 'x' ? (
                  <Icon set="fa" name="FaSpinner" className="animate-spin text-[#5B4FC9] size-7" />
                ) : (
                  <FaXTwitter size={28} className="text-[#5B4FC9]" />
                )}
              </button>
              <button
                className="w-12 h-12 flex items-center justify-center transition hover:scale-120"
                onClick={async () => {
                  if (socialLoading) return;
                  setSocialLoading('microsoft');
                  await signInWithMicrosoft();
                  setSocialLoading(null);
                }}
                disabled={!!socialLoading}
                aria-label="Sign in with Microsoft"
              >
                {socialLoading === 'microsoft' ? (
                  <Icon set="fa" name="FaSpinner" className="animate-spin text-[#5B4FC9] size-7" />
                ) : (
                  <FaMicrosoft size={28} className="text-[#5B4FC9]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
