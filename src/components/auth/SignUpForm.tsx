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

// Password validation interface
interface PasswordValidation {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';
  const { signUp, loading, error, signInWithGoogle, signInWithX, signInWithMicrosoft } = useAuth();
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  // Password validation function
  const validatePassword = (password: string): PasswordValidation => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
  };

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValidation(validatePassword(newPassword));
  };

  // Check if password is strong enough
  const isPasswordStrong = (): boolean => {
    return Object.values(passwordValidation).every(validation => validation);
  };

  // Check if passwords match
  const doPasswordsMatch = (): boolean => {
    return password === confirmPassword && confirmPassword.length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    
    // Validate password strength
    if (!isPasswordStrong()) {
      setLocalError(t('passwordRequirementsNotMet') || 'Password does not meet security requirements');
      return;
    }
    
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
                    autoComplete="email"
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
                      onChange={handlePasswordChange}
                      autoComplete="new-password"
                      data-form-type="other"
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
                  
                  {/* Password requirements with immediate feedback */}
                  {password.length > 0 && !isPasswordStrong() && (
                    <div className="mt-2">
                      <div className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <Icon set="fa" name="FaExclamationTriangle" className="size-3" />
                        <span>
                          {!passwordValidation.length && `${t('passwordLength') || 'At least 8 characters'}, `}
                          {!passwordValidation.uppercase && `${t('passwordUppercase') || 'uppercase letter'}, `}
                          {!passwordValidation.lowercase && `${t('passwordLowercase') || 'lowercase letter'}, `}
                          {!passwordValidation.number && `${t('passwordNumber') || 'number'}, `}
                          {!passwordValidation.special && `${t('passwordSpecial') || 'special character'}`}
                        </span>
                      </div>
                    </div>
                  )}
                  {password.length === 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                        <Icon set="fa" name="FaInfoCircle" className="size-3" />
                        <span>
                          {t('passwordRequirements') || 'Password must include: 8+ characters, uppercase, lowercase, number, special character'}
                        </span>
                      </div>
                    </div>
                  )}
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
                      autoComplete="new-password"
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
                  
                  {/* Password match feedback */}
                  {confirmPassword.length > 0 && (
                    <div className="mt-2">
                      <div className={`text-xs flex items-center gap-2 ${doPasswordsMatch() ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        <Icon 
                          set="fa" 
                          name={doPasswordsMatch() ? 'FaCheck' : 'FaTimes'} 
                          className="size-3" 
                        />
                        {doPasswordsMatch() ? (t('passwordsMatch') || 'Passwords match') : (t('passwordsDoNotMatch') || 'Passwords do not match')}
                      </div>
                    </div>
                  )}
                </div>
                {/* <!-- Button --> */}
                <div>
                  <Button 
                    className="w-full" 
                    size="sm" 
                    type="submit" 
                    disabled={loading}
                  >
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
              <button
                className="w-12 h-12 flex items-center justify-center transition hover:scale-120"
                onClick={async () => {
                  if (socialLoading) return;
                  setSocialLoading('google');
                  await signInWithGoogle();
                  setSocialLoading(null);
                }}
                disabled={!!socialLoading}
                aria-label="Sign up with Google"
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
                aria-label="Sign up with X"
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
                aria-label="Sign up with Microsoft"
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
