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

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';
  const { signUp, loading, error } = useAuth();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (password !== confirmPassword) {
      setLocalError(t('passwordMismatch'));
      return;
    }
    await signUp(email, password);
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className={`mb-2 font-bold uppercase text-brand-500 text-title-sm dark:text-white/90 sm:text-title-md ${isRTL ? 'text-left' : 'text-left'}`}>
              {t('createAccount')}
            </h1>
            <p className='text-md capitalize text-gray-500 dark:text-gray-400 text-left'>
              {t('createAccount')}
            </p>
          </div>
          <div>
            {(error || localError) && (
              <div className="mb-4">
                <Alert variant="error" title={t('error')} message={error || localError || ''} />
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* <!-- Email --> */}
                <div>
                  <Label className='text-left'>
                    {t('email')}<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t('enterEmail')}
                    className={isRTL ? 'text-left' : 'text-left'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label className='text-left'>
                    {t('password')}<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder={t('enterPassword')}
                      type={showPassword ? "text" : "password"}
                      className={isRTL ? 'text-left' : 'text-left'}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute z-30 -translate-y-1/2 cursor-pointer top-1/2 right-4'
                    >
                      <Icon
                        set="fa"
                        name={showPassword ? 'FaEye' : 'FaEyeSlash'}
                        className="fill-gray-500 dark:fill-gray-400 size-5"
                      />
                    </span>
                  </div>
                </div>
                {/* <!-- confirm password--> */}
                <div>
                  <Label className='text-left'>
                    {t('confirmPassword')}<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder={t('enterConfirmPassword')}
                      type={showConfirmPassword ? "text" : "password"}
                      className='text-left'
                      dir={isRTL ? 'rtl' : 'ltr'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='absolute z-30 -translate-y-1/2 cursor-pointer top-1/2 right-4'
                    >
                      <Icon
                        set="fa"
                        name={showConfirmPassword ? 'FaEye' : 'FaEyeSlash'}
                        className="fill-gray-500 dark:fill-gray-400 size-5"
                      />
                    </span>
                  </div>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <Button className="w-full" size="sm" type="submit" disabled={loading}>
                    {loading ? t('loading') : t('registerButton')}
                  </Button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <p className={`text-sm font-normal text-gray-700 dark:text-gray-400 ${isRTL ? 'text-left' : 'text-center sm:text-start'}`}>
                {t('alreadyHaveAccount')} {""}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  {t('login')}
                </Link>
              </p>
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="text-brand-500 bg-brand-800 sm:px-5 sm:py-2">
                  {t('orSignUpWith')}
                </span>
              </div>
            </div>
            {/* Social sign up buttons */}
            <div className="flex justify-center items-center gap-x-5">
              <button className="w-12 h-12 flex items-center justify-center transition hover:scale-120">
                <FaGoogle size={28} className="text-[#5B4FC9]" />
              </button>
              <button className="w-12 h-12 flex items-center justify-center transition hover:scale-120">
                <FaXTwitter size={28} className="text-[#5B4FC9]" />
              </button>
              <button className="w-12 h-12 flex items-center justify-center transition hover:scale-120">
                <FaMicrosoft size={28} className="text-[#5B4FC9]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
