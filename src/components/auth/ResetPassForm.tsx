import { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../context/LanguageContext";
import { Icon } from "../common/Icon";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useAuth } from '../../context/AuthContext';
import Alert from '../ui/alert/Alert';

export default function ResetPassForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { t } = useTranslation();
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';
  const { resetPassword, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      await resetPassword(password);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-brand-500 ">{t('resetPassword')}</h1>
        <p className="text-gray-500">{t('resetPasswordMessage')}</p>
      </div>

      {error && (
        <Alert variant="error" title={t('error')} message={error} />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="password" className='text-left'>
            {t('newPassword')} <span className="text-error-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('enterNewPassword')}
              className={isRTL ? 'text-right' : 'text-left'}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showPassword ? (
                <Icon set="fa" name="FaEye" className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <Icon set="fa" name="FaEyeSlash" className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword" className='text-left'>
            {t('confirmPassword')} <span className="text-error-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t('enterConfirmPassword')}
              className={isRTL ? 'text-right' : 'text-left'}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
            >
              {showConfirmPassword ? (
                <Icon set="fa" name="FaEye" className="fill-gray-500 dark:fill-gray-400 size-5" />
              ) : (
                <Icon set="fa" name="FaEyeSlash" className="fill-gray-500 dark:fill-gray-400 size-5" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={loading}
          className="w-full"
        >
          {loading ? t('loading') : t('resetButton')}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/signin"
          className="text-sm text-brand-500 hover:text-white transition-colors"
        >
          {t('backToLogin')}
        </Link>
      </div>
    </div>
  );
}
